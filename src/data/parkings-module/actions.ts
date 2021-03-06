import {GET_PARKINGS, SET_PARKINGS, ADD_PARKING, ADD_COMMENT_TO_PARKING, ADD_IMAGE_TO_PARKING} from "./actions.types";
import {Comment, ImagePath, Parking, ParkingActionCreator} from "./types";

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

export const addCommentToParking: ParkingActionCreator<{comment: Comment, parkingId: number}> = (payload) => {
  return {
    type: ADD_COMMENT_TO_PARKING,
    payload: payload
  }
};

export const addImageToParking: ParkingActionCreator<{image: ImagePath, parkingId: number}> = (payload) => {
  return {
    type: ADD_IMAGE_TO_PARKING,
    payload: payload
  }
};