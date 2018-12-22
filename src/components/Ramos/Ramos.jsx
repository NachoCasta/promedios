import React from "react";

import PropTypes from "prop-types";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

import { useValue } from "components/Hooks/DocumentValue.jsx";

import useNotasReducer from "components/Hooks/NotasReducer.jsx";

import { db } from "components/firebase.js";

import {
	ListaNotas,
	ListaNotasConjunto,
	ListaNotasItem,
	MenuButton
} from "./ListaNotas.jsx";

import { ListaRamos, ListaRamosItem } from "./ListaRamos.jsx";

import { SemestresNavPill, SemestreTab } from "./Semestres.jsx";

function RamosSection(props) {
	const { user } = props;
	if (!user) {
		return null;
	}
	const semestres = getSemestres(user.notas);
	return (
		<SemestresNavPill scrollable scrollButtons="auto">
			{semestres.map(([ano, semestre]) => (
				<SemestreTab key={ano + semestre} semestre={ano + "-" + semestre}>
					<Semestre refs={user.notas[ano][semestre]} />
				</SemestreTab>
			))}
		</SemestresNavPill>
	);
}

RamosSection.propTypes = {
	user: PropTypes.object.isRequired
};

function Semestre(props) {
	const { refs } = props;
	return (
		<ListaRamos>
			{refs.map((ref, i) => {
				if (ref !== "null") {
					return <Ramo key={i} notasRef={ref} />;
				}
				return null;
			})}
		</ListaRamos>
	);
}

Semestre.propTypes = {
	refs: PropTypes.array.isRequired
};

function Ramo(props) {
	const { notasRef } = props;

	const notas = useValue(notasRef);
	let ramoRef = db.collection("ramos").doc("null");
	if (notas.ramo) {
		ramoRef = notas.ramo;
	}
	let ramo = useValue(ramoRef);

	if (!ramo) {
		ramo = {};
	}

	const { sigla, nombre } = ramo;
	if (!(ramo.evaluaciones && notas.evaluaciones)) {
		return <div />;
	}

	const [state, dispatch] = useNotasReducer({
		notas: JSON.parse(JSON.stringify(notas.evaluaciones)),
		ramo: JSON.parse(JSON.stringify(ramo)),
		editingNotas: false,
		editingRamo: false
	});

	let ramoAux = [];
	let notasAux = {};

	if (state.editingNotas) {
		ramoAux = state.ramo.evaluaciones;
		notasAux = state.notas;
	} else {
		ramoAux = ramo.evaluaciones;
		notasAux = notas.evaluaciones;
	}

	const { evaluaciones, promedio } = transformEvaluaciones(ramoAux, notasAux);

	return (
		<ListaRamosItem sigla={sigla} nombre={nombre} nota={promedio}>
			<ListaNotas
				actions={
					state.editingNotas ? (
						<React.Fragment>
							<MenuButton
								label="Guardar"
								onClick={() =>
									dispatch({
										type: "guardarNotas",
										ref: db.collection("notas").doc(notasRef.id),
										promedio
									})
								}
							>
								<SaveIcon />
							</MenuButton>
							<MenuButton
								label="Cancelar"
								onClick={() => dispatch({ type: "toggleEdit" })}
							>
								<CancelIcon />
							</MenuButton>
						</React.Fragment>
					) : (
						<MenuButton
							label="Editar"
							onClick={() => dispatch({ type: "toggleEdit" })}
						>
							<EditIcon />
						</MenuButton>
					)
				}
			>
				{evaluaciones.map((conjunto, i) => (
					<ListaNotasConjunto
						key={i}
						nombre={conjunto.nombre}
						ponderacion={conjunto.ponderacion}
						nota={conjunto.nota}
						editingNotas={state.editingNotas}
						onChangeNota={e =>
							dispatch({
								type: "handleNotaChange",
								conjunto: conjunto.nombre,
								value: e.target.value,
								unica: true
							})
						}
					>
						{conjunto.evaluaciones &&
							conjunto.evaluaciones.map((evaluacion, i) => (
								<ListaNotasItem
									key={i}
									nombre={evaluacion.nombre}
									ponderacion={evaluacion.ponderacion}
									nota={evaluacion.nota}
									editing={state.editingNotas}
									onChangeNota={e =>
										dispatch({
											type: "handleNotaChange",
											conjunto: conjunto.nombre,
											evaluacion: evaluacion.nombre,
											value: e.target.value
										})
									}
								/>
							))}
					</ListaNotasConjunto>
				))}
			</ListaNotas>
		</ListaRamosItem>
	);
}

Ramo.propTypes = {
	notasRef: PropTypes.object.isRequired
};

function getSemestres(notas) {
	const semestresList = [];
	for (const [ano, semestres] of Object.entries(notas)) {
		for (const semestre of Object.keys(semestres)) {
			semestresList.push([ano, semestre]);
		}
	}
	return semestresList;
}

function transformEvaluaciones(plantilla, notas) {
	const evaluaciones = plantilla.map(conjunto => {
		let newEval = conjunto.evaluaciones;
		let common = {
			nombre: conjunto.nombre,
			ponderacion: conjunto.porcentaje
		};
		let total = 0;
		switch (conjunto.tipo) {
			case "porcentaje":
				break;
			case "iguales":
				total = conjunto.evaluaciones.length;
				newEval = conjunto.evaluaciones.map(evaluacion => {
					return {
						...evaluacion,
						ponderacion: 100 / total
					};
				});
				break;
			case "partes":
				total = conjunto.evaluaciones
					.map(evaluacion => evaluacion.peso)
					.reduce((a, b) => a + b, 0);

				newEval = conjunto.evaluaciones.map(evaluacion => {
					return {
						...evaluacion,
						ponderacion: (100 * evaluacion.peso) / total
					};
				});
				break;
			case "unico":
				return {
					...common,
					nota: notas[conjunto.nombre]
				};
			default:
				throw Error("Tipo incorrecto: " + conjunto.tipo);
		}
		newEval = newEval.map(evaluacion => {
			return {
				...evaluacion,
				nota: notas[conjunto.nombre][evaluacion.nombre]
			};
		});
		return {
			...common,
			evaluaciones: newEval,
			nota: calcNota(newEval)
		};
	});
	const promedio = calcNota(evaluaciones).toFixed(2);
	return { evaluaciones, promedio };
}

function calcNota(evaluaciones) {
	let nota = 0;
	let total = 0;
	evaluaciones.map(evaluacion => {
		if (evaluacion.nota !== "") {
			total += parseFloat(evaluacion.ponderacion);
			nota += (evaluacion.nota * evaluacion.ponderacion) / 100;
		}
		return null;
	});
	return (nota * 100) / total;
}

export default RamosSection;
