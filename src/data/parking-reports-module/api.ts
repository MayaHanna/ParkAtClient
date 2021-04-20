import axios, {AxiosResponse} from "axios";
import {ParkingReport} from "./types";

export const fetchParkingReports = async () => {
    const response:AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/parkingReports`);
    return await response.data;
}

export const addParkingReports = (formData: any) => {
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/parkingReports`,
        { formData },
        { withCredentials: true }
    );
};
