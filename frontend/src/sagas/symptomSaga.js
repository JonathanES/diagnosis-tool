import { put, takeEvery} from 'redux-saga/effects'

function *handleSymptomChosen(action){
    yield put({type: "SYMPTOM_CHOSEN", symptomChosen: action.symptomChosen});
}

function *symptomSaga(){
    yield takeEvery('USER_SYMPTOM_CHOSEN', handleSymptomChosen);
}

export default symptomSaga;