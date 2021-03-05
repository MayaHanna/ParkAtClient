import * as actions from "./actions.types";
import { ActionCreator } from "../common/types";

export interface UserState {
  user: User;
}

export interface User {
  userDisplayName: string | undefined;
}

export type UserActionCreator<P> = ActionCreator<keyof typeof actions, P>;
export type UserAction = ReturnType<UserActionCreator<never>>;
