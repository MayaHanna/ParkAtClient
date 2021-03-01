import { RootState } from "../configureStore";

export const exampleStringSelector = (state: RootState) =>
  state.Example.exampleString;
