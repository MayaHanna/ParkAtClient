import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

export interface PayPalProps {
    price: number;
    merchantId: string;

}
export const Paypal = ({price, merchantId}: PayPalProps) => {
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
                alert("Transaction completed by " + details.payer.name.given_name);
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