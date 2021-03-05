import { takeLatest, call, put } from "redux-saga/effects";
import {GET_PARKINGS, SET_PARKINGS} from "./actions.types";
import { ParkingAction} from "./types";
import {fetchParkings} from "./api";
import {setParkings} from "./actions";

function* getParkings(action: ParkingAction) {
  try {
    const parkings = yield call(fetchParkings);
    yield put(setParkings(parkings));
  } catch (e) {
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest(GET_PARKINGS, getParkings);
}

export default mySaga;
