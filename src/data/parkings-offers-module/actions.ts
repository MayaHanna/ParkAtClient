import {GET_PARKINGS_OFFERS, SET_PARKINGS_OFFERS} from "./actions.types";
import {ParkingOffer, ParkingOfferActionCreator} from "./types";

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