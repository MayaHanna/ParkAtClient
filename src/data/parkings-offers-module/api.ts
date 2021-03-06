import axios, {AxiosResponse} from "axios";

export const fetchParkingsOffers = async () => {
    const response:AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/parkingsOffers`);
    return await response.data;
}

export const addParkingOffer = (formData: any) => {
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/parkingsOffers`,
        { formData },
        { withCredentials: true }
    );
};