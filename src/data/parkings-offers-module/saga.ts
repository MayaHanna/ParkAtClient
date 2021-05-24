import { takeLatest, call, put } from "redux-saga/effects";
import {GET_PARKINGS_OFFERS} from "./actions.types";
import { ParkingOfferAction} from "./types";
import { fetchParkingsOffers} from "./api";
import { setParkingsOffers} from "./actions";

function* getParkingsOffers(action: ParkingOfferAction) {
  try {
    const fetchedParkingsOffers = yield call(fetchParkingsOffers);
    const parkingsOffers = fetchedParkingsOffers.map((offer: { dataValues: any; }) => offer.dataValues);

    yield put(setParkingsOffers(parkingsOffers));
  } catch (e) {
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest(GET_PARKINGS_OFFERS, getParkingsOffers);
}

export default mySaga;
