import React, { useEffect } from "react";

import PropTypes from "prop-types";
import deepEqual from "deep-equal";

import { db } from "components/firebase.js";
import { useValue } from "components/Hooks/DocumentValue.jsx";
import useNotasReducer from "components/Hooks/NotasReducer.jsx";
import {
	ListaNotasWrapper,
	ListaNotasConjuntoWrapper,
	ListaNotasItemWrapper
} from "./ListaNotasWrapper.jsx";
import ListaNotasMenu from "./ListaNotasMenu.jsx";
import { ListaRamosItem } from "./ListaRamos.jsx";
import { reduceEvaluaciones } from "./utils.js";

export function Ramo(props) {
	const { notasRef } = props;

	const [state, actions] = useNotasReducer(notasRef.id, {
		notas: { evaluaciones: {} },
		ramo: { evaluaciones: [] },
		editingNotas: false,
		editingRamo: false
	});

	const notas = useValue(getNotasRef(notasRef));
	const ramoRef = getRamoRef(notas);
	const ramo = useValue(ramoRef);
	useFirebase(notas, ramo, state, actions); // Syncs state with firestore database

	const evaluacionesAux = state.ramo.evaluaciones;
	const notasAux = state.notas;
	const { evaluaciones, promedio } = reduceEvaluaciones(
		evaluacionesAux,
		notasAux
	);

	const { sigla, nombre } = state.ramo;

	return (
		<ListaRamosItem sigla={sigla} nombre={nombre} nota={promedio}>
			<ListaNotasWrapper
				editingRamo={state.editingRamo}
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
						plantilla={evaluacionesAux[i]}
						actions={actions}
						editingNotas={state.editingNotas}
						editingRamo={state.editingRamo}
						conjuntoIndex={i}
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
									conjuntoIndex={i}
									evaluacionIndex={j}
								/>
							))}
					</ListaNotasConjuntoWrapper>
				))}
			</ListaNotasWrapper>
		</ListaRamosItem>
	);
}

Ramo.propTypes = {
	notasRef: PropTypes.object.isRequired
};

function useFirebase(notas, ramo, state, actions) {
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
}

function getNotasRef(notasRef) {
	let ref = notasRef;
	if (notasRef.storage) {
		ref = db.collection("notas").doc("null");
	}
	return ref;
}

function getRamoRef(notas) {
	let ramoRef = db.collection("ramos").doc("null");
	if (notas) {
		if (notas.ramo) {
			ramoRef = notas.ramo;
		}
	}
	return ramoRef;
}
