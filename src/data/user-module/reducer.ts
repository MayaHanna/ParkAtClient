import {UserAction, UserState} from "./types";
import {SET_USER } from "./actions.types";

export const initialState: UserState = {
  user: {
    userDisplayName: undefined
  }
};

type UserReducer = (
  state: UserState | undefined,
  action: UserAction
) => UserState;

const reducer: UserReducer = (
  state: UserState = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          userDisplayName: action.payload.userDisplayName,
        }
      };
    default:
      return state;
  }
};

export default reducer;
