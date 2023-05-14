import {GET_ALL_TEMPLATES, GET_ALL_TEMPLATES_SUCCESS} from "../actions/templates";
import { takeLatest, call, put } from 'redux-saga/effects';
import templates from "../../api/templates";

export default function* watcher() {
    yield takeLatest(GET_ALL_TEMPLATES, handleGetAllTemplates);
}

function* handleGetAllTemplates(action) {
    try {
        const {data} = yield call(templates.getAllTemplates)
        yield put({
            type: GET_ALL_TEMPLATES_SUCCESS,
            payload: {
                templates : data.templates,
                count: data.count
            },
        });

    }catch (e) {
        yield put({
            type: GET_ALL_TEMPLATES_SUCCESS,
            payload: e.message,
        });
    }
}