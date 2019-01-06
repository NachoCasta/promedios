import React from "react";

import {
	ListaNotas,
	ListaNotasConjunto,
	ListaNotasItem
} from "./ListaNotas.jsx";

import { transformConjunto, reduceConjunto } from "./utils.js";

export function ListaNotasConjuntoWrapper(props) {
	const {
		children,
		conjunto,
		editingNotas,
		editingRamo,
		actions,
		...rest
	} = props;

	return (
		<ListaNotasConjunto
			nombre={conjunto.nombre}
			ponderacion={conjunto.ponderacion}
			nota={conjunto.nota}
			editing={editingNotas}
			onChangeNota={actions.handleNotaChange({
				conjunto: conjunto.nombre,
				unica: true
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
		editingNotas,
		editingRamo,
		actions,
		nombreConjunto,
		...rest
	} = props;
	return (
		<ListaNotasItem
			nombre={evaluacion.nombre}
			ponderacion={evaluacion.ponderacion}
			nota={evaluacion.nota}
			editing={editingNotas}
			onChangeNota={actions.handleNotaChange({
				conjunto: nombreConjunto,
				evaluacion: evaluacion.nombre
			})}
			{...rest}
		/>
	);
}
