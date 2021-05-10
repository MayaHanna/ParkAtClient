import axios, {AxiosResponse} from "axios";
import {ParkingOffer} from "./types";

export const fetchParkingsOffers = async () => {
    const response:AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/parkingsOffers`);
    return await response.data;
}

export const addParkingOffer = (formData: any, userEmailAddress: string) => {
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/parkingsOffers`,
        { formData, userEmailAddress},
        { withCredentials: true }
    );
};

export const editParkingOffer = (parkingOfferId: number, parkingOfferFields: Partial<ParkingOffer>) => {
    return axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/parkingsOffers`,
        { id:  parkingOfferId, formData: parkingOfferFields},
        { withCredentials: true }
    );
};