const defaultState = {
    display: false,
    mostLikelyDiagnosis: '',
    listDiagnosis: []
  };
  
  const diagnosis = (state = defaultState, action) => {
    switch (action.type) {
      case 'MOST_LIKELY_DIAGNOSIS_DEMAND':
        return {
          ...state,
          display: true,
          mostLikelyDiagnosis: action.mostLikelyDiagnosis,
          listDiagnosis: action.listDiagnosis
        }; 
      default:
        return state;
    }
  };
  
  export default diagnosis;