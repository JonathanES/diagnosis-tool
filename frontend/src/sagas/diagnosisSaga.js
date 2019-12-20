import { put, takeEvery} from 'redux-saga/effects'

function *handleMostLikelyDiagnosis(action){
    yield put({type: "MOST_LIKELY_DIAGNOSIS_DEMAND", mostLikelyDiagnosis: action.mostLikelyDiagnosis, listDiagnosis: action.listDiagnosis});
    yield put({type: "DO_NOT_DISPLAY_REPORT"});
}

function *handleDisplayListDiagnosis(action){
    yield put({type: "MOST_LIKELY_DIAGNOSIS_DEMAND", mostLikelyDiagnosis: action.mostLikelyDiagnosis, listDiagnosis: action.listDiagnosis});
    yield put({type: "DISPLAY_LIST_DIAGNOSIS_DEMAND"});
}

function *diagnosisSaga(){
    yield takeEvery('USER_MOST_LIKELY_DIAGNOSIS_DEMAND', handleMostLikelyDiagnosis);
    yield takeEvery('USER_DISPLAY_LIST_DIAGNOSIS_DEMAND', handleDisplayListDiagnosis);
}

export default diagnosisSaga;