import { useLocalStorageReducer as useReducer } from "react-storage-hooks";

export default function useNotasReducer(key, initialState) {
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

  const [state, dispatch] = useReducer(key, reducer, initialState);

  return [state, dispatch];
}
