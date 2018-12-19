import { useReducer } from "react";

export default function useNotasReducer(initialState) {
  function reducer(state, action) {
    console.log(action);
    let nota;
    switch (action.type) {
      case "toggleEdit":
        return {
          ...state,
          editingNotas: !state.editingNotas
        };
      case "handleNotaChange":
        nota = action.value;
        if (isNaN(nota)) {
          nota = "";
        } else if ((parseFloat(nota) > 7) | (parseFloat(nota) < 1)) {
          return state;
        }
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
      case "handleNotaUnicaChange":
        nota = action.value;
        if (isNaN(nota)) {
          nota = "";
        } else if ((parseFloat(nota) > 7) | (parseFloat(nota) < 1)) {
          return state;
        }
        return {
          ...state,
          notas: {
            ...state.notas,
            [action.conjunto]: nota
          }
        };
      case "guardarNotas":
        action.ref.update({ evaluaciones: state.notas });
        return {
          ...state,
          editingNotas: false
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
}
