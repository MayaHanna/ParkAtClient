import * as actions from "./actions.types";
import { ActionCreator } from "../common/types";

export interface ExampleState {
  exampleString: string;
}

export type ExampleActionCreator<P> = ActionCreator<keyof typeof actions, P>;
export type ExampleAction = ReturnType<ExampleActionCreator<never>>;
