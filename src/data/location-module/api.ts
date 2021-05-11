import axios, {AxiosResponse} from "axios";
import { Coords } from "google-map-react";

export const findLocationByAddress : (a:string) => Promise<Coords> = (address: string) => {
    return axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/location/find/`+ address)
    .then(res => {
        if(res.data.candidates?.length != 1)
            throw "todo: more than one candidate or no candidates"
        else{
            return res.data.candidates[0].geometry.location
        }
    })
    .catch(err => console.log(err))
}