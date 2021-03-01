import { SET_EXAMPLE_STRING } from "./actions.types";
import { ExampleActionCreator } from "./types";

export const setExampleString: ExampleActionCreator<string> = (payload) => {
  return {
    type: SET_EXAMPLE_STRING,
    payload,
  };
};
