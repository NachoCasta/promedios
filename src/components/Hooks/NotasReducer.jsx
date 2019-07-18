import { useLocalStorageReducer as useReducer } from "react-storage-hooks";

export default function useNotasReducer(key, initialState) {
    const [state, dispatch] = useReducer(key, reducer, initialState);

    return [
        state,
        {
            editarNotas: () => () => dispatch({ type: "editarNotas" }),
            cancelEditarNotas: () => () =>
                dispatch({ type: "cancelEditarNotas" }),
            editarRamo: () => () => dispatch({ type: "editarRamo" }),
            cancelEditarRamo: () => () =>
                dispatch({ type: "cancelEditarRamo" }),
            handleNombreChange: ({ conjunto, evaluacion }) => e =>
                dispatch({
                    type: "handleNombreChange",
                    conjunto,
                    evaluacion,
                    nombre: snakeCase(e.target.value)
                }),
            handlePonderacionChange: ({ conjunto, evaluacion, tipo }) => e =>
                dispatch({
                    type: "handlePonderacionChange",
                    conjunto,
                    evaluacion,
                    tipo,
                    value: e.target.value
                }),
            handleTipoChange: ({ conjunto }) => e =>
                dispatch({
                    type: "handleTipoChange",
                    conjunto,
                    value: e.target.value
                }),
            handleNotaChange: ({ conjunto, unica, evaluacion }) => e =>
                dispatch({
                    type: "handleNotaChange",
                    conjunto,
                    unica,
                    evaluacion,
                    value: e.target.value
                }),
            guardarNotas: ({ ref, promedio }) => () =>
                dispatch({ type: "guardarNotas", ref, promedio }),
            guardarRamo: ({ ref }) => () =>
                dispatch({ type: "guardarRamo", ref }),
            updateNotas: ({ notas }) => () =>
                dispatch({ type: "updateNotas", notas }),
            updateRamo: ({ ramo }) => () =>
                dispatch({ type: "updateRamo", ramo }),
            editarPlantilla: () => () => dispatch({ type: "editarPlantilla" }),
            handleBorrar: () => () => dispatch({ type: "handleBorrar" }),
            handleOrdenar: ({ value }) => () =>
                dispatch({ type: "handleOrdenar", value }),
            agregarConjunto: () => () => dispatch({ type: "agregarConjunto" }),
            agregarEvaluacion: ({ conjunto }) => () =>
                dispatch({ type: "agregarEvaluacion", conjunto }),
            eliminarConjunto: ({ conjunto }) => () =>
                dispatch({ type: "eliminarConjunto", conjunto }),
            eliminarEvaluacion: ({ conjunto, evaluacion }) => () =>
                dispatch({ type: "eliminarEvaluacion", conjunto, evaluacion }),
            handleDragEnd: ({ reverse }) => result =>
                dispatch({ type: "onDragEnd", result, reverse })
        }
    ];
}

function reducer(state, action) {
    console.log(action);
    let nota;
    const evaluaciones = JSON.parse(JSON.stringify(state.ramo.evaluaciones));
    switch (action.type) {
        case "editarNotas":
            return {
                ...state,
                editingNotas: true,
                respaldoNotas: JSON.parse(JSON.stringify(state.notas))
            };
        case "cancelEditarNotas":
            return {
                ...state,
                editingNotas: false,
                notas: state.respaldoNotas
            };
        case "editarRamo":
            return {
                ...state,
                editingRamo: true,
                respaldoRamo: JSON.parse(JSON.stringify(state.ramo))
            };
        case "cancelEditarRamo":
            return {
                ...state,
                editingRamo: false,
                sortingRamo: false,
                ramo: state.respaldoRamo
            };
        case "handleNotaChange":
            nota = action.value;
            if (isNaN(nota)) {
                nota = "";
            } else if (parseFloat(nota) >= 10 && parseFloat(nota) / 10 <= 7) {
                nota = parseFloat(nota) / 10;
            } else if ((parseFloat(nota) < 1) | (parseFloat(nota) > 7)) {
                return state;
            }
            switch (action.unica) {
                case true:
                    return {
                        ...state,
                        notas: {
                            ...state.notas,
                            [action.conjunto]: nota
                        }
                    };
                default:
                    return {
                        ...state,
                        notas: {
                            ...state.notas,
                            [action.conjunto]: {
                                ...state.notas[action.conjunto],
                                [action.evaluacion]: nota
                            }
                        }
                    };
            }
        case "handleNombreChange":
            switch (action.evaluacion) {
                case undefined:
                    evaluaciones[action.conjunto].nombre = action.nombre;
                    return {
                        ...state,
                        ramo: {
                            ...state.ramo,
                            evaluaciones
                        }
                    };
                default:
                    evaluaciones[action.conjunto].evaluaciones[
                        action.evaluacion
                    ].nombre = action.nombre;
                    return {
                        ...state,
                        ramo: {
                            ...state.ramo,
                            evaluaciones
                        }
                    };
            }
        case "handlePonderacionChange":
            const keys = {
                porcentaje: "ponderacion",
                partes: "peso"
            };
            switch (action.evaluacion) {
                case undefined:
                    evaluaciones[action.conjunto].porcentaje = action.value;
                    return {
                        ...state,
                        ramo: {
                            ...state.ramo,
                            evaluaciones
                        }
                    };
                default:
                    evaluaciones[action.conjunto].evaluaciones[
                        action.evaluacion
                    ][keys[action.tipo]] = action.value;
                    return {
                        ...state,
                        ramo: {
                            ...state.ramo,
                            evaluaciones
                        }
                    };
            }
        case "handleTipoChange":
            evaluaciones[action.conjunto].tipo = action.value;
            return {
                ...state,
                ramo: {
                    ...state.ramo,
                    evaluaciones
                }
            };
        case "handleRamoKeyChange":
            return {
                ...state,
                ramo: {
                    ...state.ramo,
                    [action.key]: action.value
                }
            };
        case "guardarNotas":
            action.ref.update({
                evaluaciones: state.notas,
                promedio: action.promedio
            });
            return {
                ...state,
                editingNotas: false
            };
        case "guardarRamo":
            action.ref.update(state.ramo);
            return {
                ...state,
                editingRamo: false
            };
        case "updateNotas":
            return {
                ...state,
                notas: action.notas
            };
        case "updateRamo":
            return {
                ...state,
                ramo: action.ramo
            };
        case "onDragEnd":
            switch (action.result.destination) {
                case null:
                    return state;
                default:
                    const desde = action.reverse[action.result.source.index];
                    const hacia =
                        action.reverse[action.result.destination.index];
                    console.log(desde, hacia);
                    return state;
            }
        case "handleOrdenar":
            return {
                ...state,
                sortingRamo: action.value
            };
        case "agregarConjunto":
            evaluaciones.push({ nombre: "", porcentaje: 0, tipo: "unico" });
            return {
                ...state,
                ramo: {
                    ...state.ramo,
                    evaluaciones: evaluaciones
                }
            };
        case "agregarEvaluacion":
            const newEvaluacion = { nombre: "" };
            switch (evaluaciones[action.conjunto].tipo) {
                case "porcentaje":
                    newEvaluacion.ponderacion = 100;
                    break;
                case "iguales":
                    break;
                case "partes":
                    newEvaluacion.peso = 1;
                    break;
                default:
                    throw Error(
                        "No se puede agregar evaluaciones a este tipo de conjunto: " +
                            evaluaciones[action.conjunto].tipo
                    );
            }
            evaluaciones[action.conjunto].evaluaciones.push(newEvaluacion);
            return {
                ...state,
                ramo: {
                    ...state.ramo,
                    evaluaciones
                }
            };
        case "eliminarConjunto":
            evaluaciones.splice(action.conjunto, 1);
            return {
                ...state,
                ramo: {
                    ...state.ramo,
                    evaluaciones
                }
            };
        case "eliminarEvaluacion":
            evaluaciones[action.conjunto].evaluaciones.splice(
                action.evaluacion,
                1
            );
            return {
                ...state,
                ramo: {
                    ...state.ramo,
                    evaluaciones
                }
            };
        default:
            return state;
    }
}

function snakeCase(str) {
    return str.replace(/ /g, "_").toLowerCase();
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
