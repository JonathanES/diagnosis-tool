import { put, takeEvery} from 'redux-saga/effects'

function *handleReport(action){
    yield put({type: "REPORT", report: action.report});
    yield put({type: "DO_NOT_DISPLAY_DIAGNOSIS"});
}

// function *handleDisplayDiagnosis(action){
//     yield put({type: "DISPLAY_DIAGNOSIS_DEMAND"});
// }

function *reportSaga(){
    yield takeEvery('USER_REPORT', handleReport);
   // yield takeEvery('USER_DISPLAY_DIAGNOSIS_DEMAND', handleDisplayDiagnosis);
}

export default reportSaga;