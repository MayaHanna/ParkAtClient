import { RootState } from "../configureStore";

export const parkingsSelector = (state: RootState) =>
  state.Parkings.parkings;
