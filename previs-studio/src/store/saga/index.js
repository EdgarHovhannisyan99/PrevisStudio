import {all, fork} from 'redux-saga/effects';
import templates from "./templates";
import imgSaga from "./imgSaga";

export default function* watchers() {
    yield all(
        [
            templates,
            imgSaga
        ].map(fork),
    );
}
