import {GET_PARKINGS, SET_PARKINGS} from "./actions.types";
import {Parking, ParkingActionCreator} from "./types";

export const setParkings: ParkingActionCreator<Parking[]> = (payload) => {
  return {
    type: SET_PARKINGS,
    payload,
  };
};

export const getParkings = () => {
  return {
    type: GET_PARKINGS,
  }
};