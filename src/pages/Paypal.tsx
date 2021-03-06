import React, { useRef } from 'react'
import { PayPalButton } from "react-paypal-button-v2";


export const Paypal = () => {
    return (
        <PayPalButton
            options={{
                clientId: "sb",
                merchantId: "FAUJDYBDLARQG",
            }}
            onError={(error: any) => {
                console.log(error);
            }}
            amount="0.01"
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