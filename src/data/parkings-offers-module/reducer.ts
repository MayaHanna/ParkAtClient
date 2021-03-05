import {ParkingOfferAction, ParkingsOffersState} from "./types";
import { SET_PARKINGS_OFFERS } from "./actions.types";

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
    default:
      return state;
  }
};

export default reducer;
