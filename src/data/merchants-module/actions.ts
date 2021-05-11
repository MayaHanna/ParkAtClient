import {
  SET_MERCHANT, GET_MERCHANT, ADD_MERCHANT, EDIT_MERCHANT, ADD_POINTS_TO_MERCHANT
} from "./actions.types";
import {Merchant, MerchantActionCreator} from "./types";

export const setMerchant: MerchantActionCreator<Merchant> = (payload) => {
  return {
    type: SET_MERCHANT,
    payload,
  };
};

export const getMerchant: MerchantActionCreator<string> = (payload) => {
  return {
    type: GET_MERCHANT,
    payload
  }
};

export const addMerchant: MerchantActionCreator<Merchant> = (payload) => {
  return {
    type: ADD_MERCHANT,
    payload
  };
};

export const addPointsToMerchant: MerchantActionCreator<{userMail: string, pointsToAdd: number}> = (payload) => {
  return {
    type: ADD_POINTS_TO_MERCHANT,
    payload
  }
};


export const editMerchant: MerchantActionCreator<Merchant> = (payload) => {
  return {
    type: EDIT_MERCHANT,
    payload
  };
};