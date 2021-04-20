import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { editParkingOffer} from "../data/parkings-offers-module/api";
import {
    editParkingOffer as editParkingOfferAction
} from "../data/parkings-offers-module/actions";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";

export interface PayPalProps {
    price: number;
    merchantId: string;
    parkingOfferId: number;
}
export const Paypal = ({price, merchantId, parkingOfferId}: PayPalProps) => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <PayPalButton
            options={{
                clientId: "sb",
                merchantId: merchantId,
                currency: "ILS"
            }}
            onError={(error: any) => {
                console.log(error);
            }}
            amount={price}
            onSuccess={(details: any, data: any) => {
                console.log("success");
                editParkingOffer(parkingOfferId, {status: "Closed"})
                    .then(res => {
                        console.log("הצעת החניה נתפסה בהצלחה");
                        dispatch(editParkingOfferAction({id: parkingOfferId, status: "Closed"}));
                        history.push("/home");
                    })
                    .catch(err => console.log(err))
            }}
            catchError={(err: any) => {
                console.log(err.toString());
            }}
            onApprove={() => {
                console.log("approve")
            }}
        />
    )
};