import {
    GET_ALL_TEMPLATES,
    GET_ALL_TEMPLATES_SUCCESS,
    GET_SINGLE_TEMPLATE, GET_SINGLE_TEMPLATE_FAIL,
    GET_SINGLE_TEMPLATE_SUCCESS
} from "../actions/templates";
import { takeLatest, call, put } from 'redux-saga/effects';
import templates from "../../api/templates";

export default function* watcher() {
    yield takeLatest(GET_ALL_TEMPLATES, handleGetAllTemplates);
    yield takeLatest(GET_SINGLE_TEMPLATE, handleGetSingleTemplate);
}

function* handleGetAllTemplates(action) {
    try {
        const {formData = {}} = action.payload
        const {data} = yield call(templates.getAllTemplates, formData.search, formData.filter)
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

function* handleGetSingleTemplate(action) {
    try {
        const {templateId} = action.payload
        const {data} = yield call(templates.getSingleTemplates, templateId)

        yield put({
            type: GET_SINGLE_TEMPLATE_SUCCESS,
            payload: {
                template : data.template,
            },
        });

    }catch (e) {
        yield put({
            type: GET_SINGLE_TEMPLATE_FAIL,
            payload: e.message,
        });
    }
}