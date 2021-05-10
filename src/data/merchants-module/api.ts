import axios, { AxiosResponse } from "axios";

export const getMerchantByUser = async (userMailAddress: string) => {
    return axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/merchants/byUser/${userMailAddress}`)
        .then(res => res.data)
        .catch(err => console.log(err))
}
