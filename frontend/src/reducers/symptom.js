const defaultState = {
    symptomChosen: ''
  };
  
  const symptom = (state = defaultState, action) => {
    switch (action.type) {
      case 'SYMPTOM_CHOSEN':
        return {
          ...state,
          symptomChosen: action.symptomChosen
        }; 
      default:
        return state;
    }
  };
  
  export default symptom;