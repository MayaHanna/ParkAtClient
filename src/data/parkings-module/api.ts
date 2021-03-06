import axios, { AxiosResponse } from "axios";
import {ImagePath} from "./types";

export const fetchParkings = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/parkings`);
    return await response.data;
}
export const getParkingsByOwner = async (ownerId: string) => {
    return axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/parkings/byOwner/${ownerId}`)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export const addParking = (formData: any) => {
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/parkings`,
        { formData },
        { withCredentials: true }
    );
};

export const postCommentToParking = (parkingId: number, comment: Comment) => {
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/parkings/comment`, { parkingId, comment },
        { withCredentials: true })
};

export const postImageToParking = (parkingId: number, image: ImagePath) => {
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/parkings/image`, { parkingId, image },
        { withCredentials: true })
};