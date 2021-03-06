const defaultState = {
  displayDiagnosis: false,
  mostLikelyDiagnosis: '',
  listDiagnosis: [],
  displayListDiagnosis: false
};

const diagnosis = (state = defaultState, action) => {
  switch (action.type) {
    case 'MOST_LIKELY_DIAGNOSIS_DEMAND':
      return {
        ...state,
        displayDiagnosis: true,
        mostLikelyDiagnosis: action.mostLikelyDiagnosis,
        listDiagnosis: action.listDiagnosis
      };
    case 'DISPLAY_LIST_DIAGNOSIS_DEMAND':
      return {
        ...state,
        displayListDiagnosis: !state.displayListDiagnosis
      }
    case "DISPLAY_DIAGNOSIS_DEMAND":
      return {
        ...state,
        displayDiagnosis: true
      }
    case "DO_NOT_DISPLAY_DIAGNOSIS":
      return {
        ...state,
        displayDiagnosis: false
      }
    default:
      return state;
  }
};

export default diagnosis;