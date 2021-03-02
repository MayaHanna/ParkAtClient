import axios, {AxiosResponse} from "axios";

export const fetchParkings = async () => {
    const response:AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/parkings`);
    return await response.data;
}