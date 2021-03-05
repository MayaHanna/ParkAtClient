import { SET_USER } from "./actions.types";
import { UserActionCreator, User } from "./types";

export const setUser: UserActionCreator<User> = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};