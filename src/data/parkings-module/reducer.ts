import { ParkingAction, ParkingsState} from "./types";
import { SET_PARKINGS } from "./actions.types";

export const initialState: ParkingsState = {
  parkings: [],
};

type ExampleReducer = (
  state: ParkingsState | undefined,
  action: ParkingAction
) => ParkingsState;

const reducer: ExampleReducer = (
  state: ParkingsState = initialState,
  action: ParkingAction
) => {
  switch (action.type) {
    case SET_PARKINGS:
      return {
        ...state,
        parkings: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
