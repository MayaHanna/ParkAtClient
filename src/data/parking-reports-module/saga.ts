import { takeLatest, call, put } from "redux-saga/effects";
import {GET_PARKING_REPORTS} from "./actions.types";
import { ParkingReportAction} from "./types";
import { fetchParkingReports} from "./api";
import { setParkingsReports} from "./actions";

function* getParkingReports(action: ParkingReportAction) {
  try {
    const parkingsReports = yield call(fetchParkingReports);
    yield put(setParkingsReports(parkingsReports));
  } catch (e) {
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest(GET_PARKING_REPORTS, getParkingReports);
}

export default mySaga;
