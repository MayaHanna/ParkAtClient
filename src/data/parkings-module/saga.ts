import { takeLatest, call, put } from "redux-saga/effects";
import {ADD_COMMENT_TO_PARKING, GET_PARKINGS, SET_PARKINGS} from "./actions.types";
import { ParkingAction} from "./types";
import {fetchParkings, postCommentToParking} from "./api";
import {addParking, setParkings} from "./actions";
import {addPointsToMerchant} from "../merchants-module/actions";

function* getParkings(action: ParkingAction) {
  try {
    const parkings = yield call(fetchParkings);
    yield put(setParkings(parkings));
  } catch (e) {
    console.log(e);
  }
}

function* addCommentToParking(action: ParkingAction) {
  try {
    yield call(postCommentToParking, action.payload.parkingId, action.payload.comment);
    const parkings = yield call(fetchParkings);
    yield put(setParkings(parkings));
    yield put(addPointsToMerchant({
      userMail: action.payload.comment.publisher,
      pointsToAdd: 5
    }))
  } catch (e) {
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest(GET_PARKINGS, getParkings);
  yield takeLatest(ADD_COMMENT_TO_PARKING, addCommentToParking)
}

export default mySaga;
