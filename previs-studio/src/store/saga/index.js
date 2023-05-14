import {all, fork} from 'redux-saga/effects';
import templates from "./templates";

export default function* watchers() {
    yield all(
        [
            templates
        ].map(fork),
    );
}
