import {ActionCreator} from "../common/types";
import * as actions from "./actions.types";

export interface Merchant {
  merchantId: string;
  points: number;
  userEmailAddress: string;
}

export interface MerchantState {
  merchant: Merchant
}
export type MerchantActionCreator<P> = ActionCreator<keyof typeof actions, P>;
export type MerchantAction = ReturnType<MerchantActionCreator<never>>;