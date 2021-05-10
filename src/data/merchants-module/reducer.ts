import {MerchantState, MerchantAction} from "./types";
import {SET_MERCHANT} from "./actions.types";

export const initialState: MerchantState = {
  merchant: {
    merchantId: "",
    userMailAddress: "",
    points: 0
  },
};

type MerchantReducer = (
  state: MerchantState | undefined,
  action: MerchantAction
) => MerchantState;

const reducer: MerchantReducer = (
  state: MerchantState = initialState,
  action: MerchantAction
) => {
  switch (action.type) {
    case SET_MERCHANT:
      return {
        ...state,
        merchant: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
