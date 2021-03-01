import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import Example from "./example-module/reducer";
import { ExampleState } from "./example-module/types";
import exampleSaga from "./example-module/saga";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
export const rootReducer = { Example };
export const rootMiddleware = [sagaMiddleware];

export const rootSaga = [exampleSaga];

export default createStore(
  combineReducers(rootReducer),
  composeWithDevTools(applyMiddleware(...rootMiddleware))
);

rootSaga.forEach((saga) => sagaMiddleware.run(saga));

export type RootState = {
  Example: ExampleState;
};
