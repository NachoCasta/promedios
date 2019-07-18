export function getSemestres(notas) {
	const semestresList = [];
	for (const [ano, semestres] of Object.entries(notas)) {
		for (const semestre of Object.keys(semestres)) {
			semestresList.push([ano, semestre]);
		}
	}
	return semestresList;
}

export function reduceEvaluaciones(plantilla, notas) {
	const evaluaciones = transformEvaluaciones(plantilla).map(
		reduceConjunto(notas)
	);

	const promedio = calcNota(evaluaciones).toFixed(2);
	return { evaluaciones, promedio };
}

export function reduceConjunto(notas) {
	return conjunto => {
		if (conjunto.evaluaciones) {
			let newEval = conjunto.evaluaciones.map(evaluacion => {
				if (notas[conjunto.nombre]) {
					return {
						...evaluacion,
						nota: notas[conjunto.nombre][evaluacion.nombre]
					};
				} else {
					return evaluacion;
				}
			});
			return {
				...conjunto,
				evaluaciones: newEval,
				nota: calcNota(newEval)
			};
		} else {
			return {
				...conjunto,
				nota: notas[conjunto.nombre]
			};
		}
	};
}

export function transformEvaluaciones(plantilla) {
	return plantilla.map(transformConjunto);
}

export function transformConjunto(conjunto) {
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
			// Quantity of evaluations
			total = conjunto.evaluaciones.length;
			newEval = conjunto.evaluaciones.map(transformIguales(total));
			break;
		case "partes":
			// Sum of all weights
			if (!conjunto.evaluaciones) {
				conjunto.evaluaciones = [];
			}
			total = conjunto.evaluaciones
				.map(evaluacion => evaluacion.peso)
				.reduce((a, b) => a + b, 0);
			newEval = conjunto.evaluaciones.map(transformPartes(total));
			break;
		case "unico":
			return common;
		default:
			throw Error("Tipo incorrecto: " + conjunto.tipo);
	}
	return {
		...common,
		evaluaciones: newEval
	};
}

function transformIguales(total) {
	return evaluacion => ({
		...evaluacion,
		ponderacion: 100 / total
	});
}

function transformPartes(total) {
	return evaluacion => ({
		...evaluacion,
		ponderacion: (100 * evaluacion.peso) / total
	});
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

export function titleCase(str) {
	var splitStr = str
		.replace(/_/g, " ")
		.toLowerCase()
		.split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(" ");
}

export function toPerc(n) {
	return (Math.round(n * 10) / 10).toString() + " %";
}

export function toFloat(s) {
	return s ? parseFloat(s).toFixed(1) : s;
}

export function getIndexes(evaluaciones) {
	const conjuntosIndexes = {};
	const evaluacionesIndexes = {};
	var [counter, i, j] = [0, 0, 0];

	for (const conjunto of evaluaciones) {
		conjuntosIndexes[i] = counter;
		evaluacionesIndexes[i] = {};
		j = 0;
		if (conjunto.evaluaciones) {
			for (const evaluacion of conjunto.evaluaciones) {
				counter++;
				evaluacionesIndexes[i][j] = counter;
				j++;
			}
		}
		counter++;
		i++;
	}

	return { conjuntos: conjuntosIndexes, evaluaciones: evaluacionesIndexes };
}

export function reverseIndexes(indexes) {
	const reverse = {};
	for (const [conj, value] of Object.entries(indexes.conjuntos)) {
		reverse[value] = { i: conj };
	}
	for (const [conj, evaluaciones] of Object.entries(indexes.evaluaciones)) {
		for (const [ev, value] of Object.entries(evaluaciones)) {
			reverse[value] = { i: conj, j: ev };
		}
	}
	return reverse;
}
