import axios, {AxiosResponse} from "axios";

export const fetchParkingsOffers = async () => {
    const response:AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/parkingsOffers`);
    return await response.data;
}