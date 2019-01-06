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
            handleNombreChange: () => null,
            handlePonderacionChange: () => null,
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
            handleBorrar: () => () => dispatch({ type: "handleBorrar" })
        }
    ];
}

function reducer(state, action) {
    console.log(action);
    let nota;
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
            //action.ref.update(state.ramo);
            console.log(state.ramo);
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
        default:
            return state;
    }
}
