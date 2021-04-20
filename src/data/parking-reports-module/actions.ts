import {
  SET_PARKING_REPORTS, 
  GET_PARKING_REPORTS,
  ADD_PARKING_REPORT,
  EDIT_PARKING_REPORT
} from "./actions.types";
import { ParkingReport, ParkingReportActionCreator } from "./types";

export const setParkingsReports: ParkingReportActionCreator<ParkingReport[]> = (payload) => {
  return {
    type: SET_PARKING_REPORTS,
    payload,
  };
};

export const getParkingReports = () => {
  return {
    type: GET_PARKING_REPORTS,
  }
};

export const addParkingReports: ParkingReportActionCreator<ParkingReport> = (payload) => {
  return {
    type: ADD_PARKING_REPORT,
    payload
  };
};

export const editParkingReports: ParkingReportActionCreator<Partial<ParkingReport>> = (payload) => {
  return {
    type: EDIT_PARKING_REPORT,
    payload
  };
};