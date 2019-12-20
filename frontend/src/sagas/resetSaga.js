import { put, takeEvery} from 'redux-saga/effects'

function *handleReset(){
    yield put({type: "DO_NOT_DISPLAY_REPORT"});
    yield put({type: "DO_NOT_DISPLAY_DIAGNOSIS"});
}

function *resetSaga(){
    yield takeEvery('USER_RESET', handleReset);
}

export default resetSaga;