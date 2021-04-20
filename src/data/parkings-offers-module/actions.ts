import { ADD_PARKING_OFFER, GET_PARKINGS_OFFERS, SET_PARKINGS_OFFERS, EDIT_PARKING_OFFER } from "./actions.types";
import { ParkingOffer, ParkingOfferActionCreator } from "./types";

export const setParkingsOffers: ParkingOfferActionCreator<ParkingOffer[]> = (payload) => {
  return {
    type: SET_PARKINGS_OFFERS,
    payload,
  };
};

export const getParkingsOffers = () => {
  return {
    type: GET_PARKINGS_OFFERS,
  }
};

export const addParkingOffer: ParkingOfferActionCreator<ParkingOffer> = (payload) => {
  return {
    type: ADD_PARKING_OFFER,
    payload
  };
};

export const editParkingOffer: ParkingOfferActionCreator<Partial<ParkingOffer>> = (payload) => {
  return {
    type: EDIT_PARKING_OFFER,
    payload
  };
};