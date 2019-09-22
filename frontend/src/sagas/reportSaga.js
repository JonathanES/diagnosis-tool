import { put, takeEvery} from 'redux-saga/effects'

function *handleReport(action){
    yield put({type: "REPORT", report: action.report});
    yield put({type: "DO_NOT_DISPLAY_DIAGNOSIS"});
}

function *reportSaga(){
    yield takeEvery('USER_REPORT', handleReport);
}

export default reportSaga;