import { call, put, takeEvery } from "redux-saga/effects"
import {
    GET_All_ACTION, GET_All_ACTION_SUCCESS, GET_All_DATA, GET_DATA_SUCCESS, GET_LIST_OPERATION_ACTION, GET_LIST_OPERATION_SUCCESS,
} from "../Actions/action";
import {getApi} from "../Services/dataService";
import {getApiDataAction} from "../Services/dataActionService";
import {getListOperation} from "../Services/listOperationService";




function* fetchData() {
    try {
        const data = yield call(getApi);
        yield put({ type: GET_DATA_SUCCESS, data: data });
    } catch (e: any) {
        yield put({ type: 'GET_USERS_FAILED', message: e.message });
    }
}

function* fetchDataAction() {
    try {
        const data = yield call(getApiDataAction);
        yield put({ type: GET_All_ACTION_SUCCESS, data: data });
    } catch (e: any) {
        yield put({ type: 'GET_USERS_FAILED', message: e.message });
    }
}

function* fetchListOperation() {
    try {
        const data = yield call(getListOperation);
        yield put({ type: GET_LIST_OPERATION_SUCCESS, data: data });
    } catch (e: any) {
        yield put({ type: 'GET_USERS_FAILED', message: e.message });
    }
}




function* userSaga() {
    yield takeEvery(GET_All_DATA, fetchData);
    yield takeEvery(GET_All_ACTION, fetchDataAction);
    yield takeEvery(GET_LIST_OPERATION_ACTION, fetchListOperation);
    
}

export default userSaga;