import {GET_PARKINGS, SET_PARKINGS, ADD_PARKING} from "./actions.types";
import {Parking, ParkingActionCreator} from "./types";

export const setParkings: ParkingActionCreator<Parking[]> = (payload) => {
  return {
    type: SET_PARKINGS,
    payload,
  };
};

export const addParking: ParkingActionCreator<Parking> = (payload) => {
  return {
    type: ADD_PARKING,
    payload
  };
};

export const getParkings = () => {
  return {
    type: GET_PARKINGS,
  }
};