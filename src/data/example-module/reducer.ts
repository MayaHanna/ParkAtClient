import { ExampleAction, ExampleState } from "./types";
import { SET_EXAMPLE_STRING } from "./actions.types";

export const initialState: ExampleState = {
  exampleString: "Hello Paz",
};

type ExampleReducer = (
  state: ExampleState | undefined,
  action: ExampleAction
) => ExampleState;

const reducer: ExampleReducer = (
  state: ExampleState = initialState,
  action: ExampleAction
) => {
  switch (action.type) {
    case SET_EXAMPLE_STRING:
      return {
        ...state,
        exampleString: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
