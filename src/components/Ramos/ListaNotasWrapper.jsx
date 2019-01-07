import React from "react";

import {
	ListaNotas,
	ListaNotasConjunto,
	ListaNotasItem
} from "./ListaNotas.jsx";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function ListaNotasWrapper(props) {
	const { ...rest } = props;
	return <ListaNotas {...rest} />;
}

export function ListaNotasConjuntoWrapper(props) {
	const {
		children,
		conjunto,
		editingRamo,
		actions,
		plantilla,
		conjuntoIndex,
		...rest
	} = props;

	return (
		<ListaNotasConjunto
			nombre={conjunto.nombre}
			ponderacion={
				editingRamo ? plantilla.porcentaje : conjunto.ponderacion
			}
			nota={conjunto.nota}
			editingRamo={editingRamo}
			tipo={plantilla.tipo}
			onChangeNota={actions.handleNotaChange({
				conjunto: conjunto.nombre,
				unica: true
			})}
			onChangeNombre={actions.handleNombreChange({
				conjunto: conjuntoIndex
			})}
			onChangePonderacion={actions.handlePonderacionChange({
				conjunto: conjuntoIndex,
				tipo: plantilla.tipo
			})}
			onChangeTipo={actions.handleTipoChange({
				conjunto: conjuntoIndex
			})}
			{...rest}
		>
			{children}
		</ListaNotasConjunto>
	);
}

export function ListaNotasItemWrapper(props) {
	const {
		evaluacion,
		editingRamo,
		actions,
		nombreConjunto,
		conjuntoIndex,
		evaluacionIndex,
		plantilla,
		tipo,
		...rest
	} = props;
	const { input, ponderacion } = getPonderacion(evaluacion, plantilla, tipo);
	return (
		<ListaNotasItem
			nombre={evaluacion.nombre}
			ponderacion={editingRamo ? ponderacion : evaluacion.ponderacion}
			nota={evaluacion.nota}
			editingRamo={editingRamo}
			input={input}
			onChangeNota={actions.handleNotaChange({
				conjunto: nombreConjunto,
				evaluacion: evaluacion.nombre
			})}
			onChangeNombre={actions.handleNombreChange({
				conjunto: conjuntoIndex,
				evaluacion: evaluacionIndex
			})}
			onChangePonderacion={actions.handlePonderacionChange({
				conjunto: conjuntoIndex,
				evaluacion: evaluacionIndex,
				tipo
			})}
			{...rest}
		/>
	);
}

const getPonderacion = (evaluacion, plantilla, tipo) => {
	switch (tipo) {
		case "porcentaje":
			return { input: true, ponderacion: plantilla.ponderacion };
		case "iguales":
			return { input: false, ponderacion: evaluacion.ponderacion };
		case "partes":
			return { input: true, ponderacion: plantilla.peso };
		default:
			throw Error("Tipo incorrecto");
	}
};
