import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import Example from "./example-module/reducer";
import Parkings from "./parkings-module/reducer";
import ParkingsOffers from "./parkings-offers-module/reducer";
import { ExampleState } from "./example-module/types";
import exampleSaga from "./example-module/saga";
import parkingsSaga from "./parkings-module/saga";
import parkingsOffersSaga from "./parkings-offers-module/saga";
import {ParkingsState} from "./parkings-module/types";
import {ParkingsOffersState} from "./parkings-offers-module/types";
import { UserState } from "./user-module/types";
import User from "./user-module/reducer";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
export const rootReducer = { Example, Parkings, ParkingsOffers, User };
export const rootMiddleware = [sagaMiddleware];

export const rootSaga = [exampleSaga, parkingsSaga, parkingsOffersSaga];

export default createStore(
  combineReducers(rootReducer),
  composeWithDevTools(applyMiddleware(...rootMiddleware))
);

rootSaga.forEach((saga) => sagaMiddleware.run(saga));

export type RootState = {
  Example: ExampleState;
  Parkings: ParkingsState;
  User: UserState
  ParkingsOffers: ParkingsOffersState;
};
