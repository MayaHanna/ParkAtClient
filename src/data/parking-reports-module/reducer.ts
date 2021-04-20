import { ParkingReportAction, ParkingReortrsState } from "./types";
import {
  SET_PARKING_REPORTS, 
  GET_PARKING_REPORTS,
  ADD_PARKING_REPORT,
  EDIT_PARKING_REPORT
} from "./actions.types";

export const initialState: ParkingReortrsState = {
  parkingReports: [],
};

type ExampleReducer = (
  state: ParkingReortrsState | undefined,
  action: ParkingReportAction
) => ParkingReortrsState;

const reducer: ExampleReducer = (
  state: ParkingReortrsState = initialState,
  action: ParkingReportAction
) => {
  switch (action.type) {
    case SET_PARKING_REPORTS:
      return {
        ...state,
        parkingReports: action.payload,
      };
    case ADD_PARKING_REPORT:
      return {
        ...state,
        parkingReports: [
          ...state.parkingReports,
          { ...action.payload }
        ]
      };
    case EDIT_PARKING_REPORT:
      const currentParkingReports = state.parkingReports;
      const newParkingReports = currentParkingReports.map((pr) => {
        if (action.payload.id === pr.id) {
          return {
            ...pr,
            ...action.payload
          }
        }

        return pr;
      });

      return {
        ...state,
        parkingReports: newParkingReports
      };
    default:
      return state;
  }
};

export default reducer;
