import axios, { AxiosResponse } from "axios";

export const fetchParkings = async () => {
    const response: AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/parkings`);
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
