import React, { useEffect } from "react";

import PropTypes from "prop-types";
import deepEqual from "deep-equal";

import MenuItem from "@material-ui/core/MenuItem";

import { db } from "components/firebase.js";
import { useValue } from "components/Hooks/DocumentValue.jsx";
import useNotasReducer from "components/Hooks/NotasReducer.jsx";
import { ListaNotas } from "./ListaNotas.jsx";
import {
	ListaNotasConjuntoWrapper,
	ListaNotasItemWrapper
} from "./ListaNotasWrapper.jsx";
import ListaNotasMenu from "./ListaNotasMenu.jsx";
import { ListaRamos, ListaRamosItem } from "./ListaRamos.jsx";
import { SemestresNavPill, SemestreTab } from "./Semestres.jsx";
import { getSemestres, reduceEvaluaciones } from "./utils.js";

function RamosSection(props) {
	const { user } = props;
	if (!user) {
		return null;
	}
	const semestres = getSemestres(user.notas);
	return (
		<SemestresNavPill scrollable scrollButtons="auto">
			{semestres.map(([ano, semestre]) => (
				<SemestreTab
					key={ano + semestre}
					semestre={ano + "-" + semestre}
				>
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
	let ref = props.notasRef;
	if (notasRef.storage) {
		ref = db.collection("notas").doc("null");
	}

	const notas = useValue(ref);
	let ramoRef = db.collection("ramos").doc("null");
	if (notas) {
		if (notas.ramo) {
			ramoRef = notas.ramo;
		}
	}
	let ramo = useValue(ramoRef);

	if (!ramo) {
		ramo = {};
	}

	const [state, actions] = useNotasReducer(notasRef.id, {
		notas: { evaluaciones: {} },
		ramo: { evaluaciones: [] },
		editingNotas: false,
		editingRamo: false
	});

	const { sigla, nombre } = state.ramo;

	useEffect(() => {
		if (notas) {
			if (
				// Update only if there is a change and you are not editing
				!deepEqual(state.notas, notas.evaluaciones) &&
				notas.evaluaciones &&
				!state.editingNotas
			) {
				actions.updateNotas({ notas: notas.evaluaciones })();
			}
		}
		if (ramo) {
			if (
				// Update only if there is a change and you are not editing
				!deepEqual(state.ramo, ramo) &&
				ramo.evaluaciones &&
				!state.editingRamo
			) {
				actions.updateRamo({ ramo })();
			}
		}
	});

	let evaluacionesAux = state.ramo.evaluaciones;
	let notasAux = state.notas;

	const { evaluaciones, promedio } = reduceEvaluaciones(
		evaluacionesAux,
		notasAux
	);

	return (
		<ListaRamosItem sigla={sigla} nombre={nombre} nota={promedio}>
			<ListaNotas
				actions={
					<ListaNotasMenu
						editingNotas={state.editingNotas}
						editingRamo={state.editingRamo}
						onClickGuardarNotas={actions.guardarNotas({
							ref: db.collection("notas").doc(notasRef.id),
							promedio
						})}
						onClickCancelNotas={actions.cancelEditarNotas()}
						onClickEditarNotas={actions.editarNotas()}
						onClickGuardarRamo={actions.guardarRamo({
							ref: db.collection("ramos").doc(ramoRef.id)
						})}
						onClickCancelRamo={actions.cancelEditarRamo()}
						onClickEditarRamo={actions.editarRamo()}
						onClickBorrar={actions.handleBorrar()}
					/>
				}
			>
				{evaluaciones.map((conjunto, i) => (
					<ListaNotasConjuntoWrapper
						key={i}
						conjunto={conjunto}
						planilla={evaluacionesAux[i]}
						actions={actions}
						editingNotas={state.editingNotas}
						editingRamo={state.editingRamo}
					>
						{conjunto.evaluaciones &&
							conjunto.evaluaciones.map((evaluacion, j) => (
								<ListaNotasItemWrapper
									key={j}
									evaluacion={evaluacion}
									tipo={evaluacionesAux[i].tipo}
									plantilla={
										evaluacionesAux[i].evaluaciones[j]
									}
									actions={actions}
									editingNotas={state.editingNotas}
									editingRamo={state.editingRamo}
									nombreConjunto={conjunto.nombre}
								/>
							))}
					</ListaNotasConjuntoWrapper>
				))}
			</ListaNotas>
		</ListaRamosItem>
	);
}

Ramo.propTypes = {
	notasRef: PropTypes.object.isRequired
};

export default RamosSection;
