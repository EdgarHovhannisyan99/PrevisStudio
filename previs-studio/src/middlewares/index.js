import createSagaMiddleware from 'redux-saga';
import reducer from '../store/reducers';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  // Note: passing middleware as the last argument to createStore requires redux@>=3.1.0
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      reducer,
      initialState,
      applyMiddleware(thunk, sagaMiddleware),
    ),
    runSaga: sagaMiddleware.run,
  };
}
