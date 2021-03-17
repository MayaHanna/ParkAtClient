import { RootState } from "../configureStore";

export const userSelector = (state: RootState) =>
  state.User.user;
