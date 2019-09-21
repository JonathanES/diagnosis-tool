import { put, takeEvery} from 'redux-saga/effects'

function *handleMostLikelyDiagnosis(action){
    yield put({type: "MOST_LIKELY_DIAGNOSIS_DEMAND", mostLikelyDiagnosis: action.mostLikelyDiagnosis, listDiagnosis: action.listDiagnosis});
}

function *diagnosisSaga(){
    yield takeEvery('USER_MOST_LIKELY_DIAGNOSIS_DEMAND', handleMostLikelyDiagnosis);
}

export default diagnosisSaga;