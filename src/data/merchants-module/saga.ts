import { takeLatest, call, put } from "redux-saga/effects";
import {ADD_MERCHANT, ADD_POINTS_TO_MERCHANT, EDIT_MERCHANT, GET_MERCHANT} from "./actions.types";
import {MerchantAction} from "./types";
import {getMerchantByUser, postMerchant, putMerchant, putPointsToMerchant} from "./api";
import {setMerchant, addMerchant as addMerchantAction} from "./actions";

function* getMerchant(action: MerchantAction) {
  try {
    const merchant = yield call(getMerchantByUser, action.payload);

    if (merchant) {
      yield put(setMerchant(merchant));
    } else {
      yield put(addMerchantAction({
        merchantId: "",
        userMailAddress: action.payload,
        points: 0
      }))
    }
  } catch (e) {
    console.log(e);
  }
}

function* addMerchant(action: MerchantAction) {
  try {
    const merchant = yield call(postMerchant, action.payload);
    yield put(setMerchant(merchant));
  } catch (e) {
    console.log(e);
  }
}

function* addPointsToMerchant(action: MerchantAction) {
  try {
    const merchant = yield call(putPointsToMerchant, action.payload.userMail, action.payload.pointsToAdd);
    yield put(setMerchant(merchant));
  } catch (e) {
    console.log(e);
  }
}

function* editMerchant(action: MerchantAction) {
  try {
    const merchant = yield call(putMerchant, action.payload);
    yield put(setMerchant(merchant));
  } catch (e) {
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest(GET_MERCHANT, getMerchant);
  yield takeLatest(ADD_MERCHANT, addMerchant);
  yield takeLatest(ADD_POINTS_TO_MERCHANT, addPointsToMerchant);
  yield takeLatest(EDIT_MERCHANT, editMerchant);
}

export default mySaga;
