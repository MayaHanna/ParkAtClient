import { ParkingOfferAction, ParkingsOffersState } from "./types";
import {SET_PARKINGS_OFFERS, ADD_PARKING_OFFER, EDIT_PARKING_OFFER} from "./actions.types";

export const initialState: ParkingsOffersState = {
  parkingsOffers: [],
};

type ExampleReducer = (
  state: ParkingsOffersState | undefined,
  action: ParkingOfferAction
) => ParkingsOffersState;

const reducer: ExampleReducer = (
  state: ParkingsOffersState = initialState,
  action: ParkingOfferAction
) => {
  switch (action.type) {
    case SET_PARKINGS_OFFERS:
      return {
        ...state,
        parkingsOffers: action.payload,
      };
    case ADD_PARKING_OFFER:
      return {
        ...state,
        parkingsOffers: [
          ...state.parkingsOffers,
          { ...action.payload }
        ]
      };
    case EDIT_PARKING_OFFER:
      const currentParkingsOffers = state.parkingsOffers;
      const newParkingsOffers = currentParkingsOffers.map((po) => {
        if (action.payload.id === po.id) {
          return {
            ...po,
            ...action.payload
          }
        }

        return po;
      });

      return {
        ...state,
        parkingsOffers: newParkingsOffers
      };
    default:
      return state;
  }
};

export default reducer;
