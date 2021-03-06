import { takeLatest, call, put } from "redux-saga/effects";
import {GET_PARKINGS_OFFERS} from "./actions.types";
import { ParkingOfferAction} from "./types";
import { fetchParkingsOffers} from "./api";
import { setParkingsOffers} from "./actions";

function* getParkingsOffers(action: ParkingOfferAction) {
  try {
    const parkingsOffers = yield call(fetchParkingsOffers);
    yield put(setParkingsOffers(parkingsOffers));
  } catch (e) {
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest(GET_PARKINGS_OFFERS, getParkingsOffers);
}

export default mySaga;
