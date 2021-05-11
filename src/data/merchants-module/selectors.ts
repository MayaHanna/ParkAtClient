import {RootState} from "../configureStore";

export const merchantSelector = (state: RootState) => {
    return state.Merchant.merchant;
};