import axios, { AxiosResponse } from "axios";
import {Merchant} from "./types";

export const getMerchantByUser = async (userEmailAddress: string) => {
    return axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/merchants/byUser/${userEmailAddress}`)
        .then(res => res.data)
        .catch(err => console.log(err))
};

export const postMerchant = async (formData: any) => {
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/merchants`, {
        formData
    })
        .then(res => res.data)
        .catch(err => console.log(err))
};

export const putPointsToMerchant = async (userMail: string, pointsToAdd: number) => {
    return axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/merchants/points`, {
        userMail,
        pointsToAdd
    })
        .then(res => res.data)
        .catch(err => console.log(err))
};

export const putMerchant = async (formData: any) => {
    return axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/merchants`, {
        formData
    })
        .then(res => res.data)
        .catch(err => console.log(err))
};