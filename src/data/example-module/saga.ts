import { takeEvery } from "redux-saga/effects";
import { SET_EXAMPLE_STRING } from "./actions.types";
import { ExampleAction } from "./types";

// eslint-disable-next-line
function* consoleNewExampleString(action: ExampleAction) {
  yield setTimeout(() => {
    console.log(action.payload);
  }, 2000);
}

function* mySaga() {
  yield takeEvery(SET_EXAMPLE_STRING, consoleNewExampleString);
}

export default mySaga;
