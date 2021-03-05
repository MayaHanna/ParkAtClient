import { RootState } from "../configureStore";
import {createSelector} from "reselect";

export const getProps = (state: RootState, props: any) => props;

export const parkingsSelector = (state: RootState) =>
  state.Parkings.parkings;


export const parkingsWithFilterSelector = createSelector(
    [parkingsSelector, getProps], (parkings, props) => {
        return parkings.filter(p => {
            return (p.description.includes(props.searchText) || p.address.includes(props.searchText))
        })
    }
);

export const parkingsWitIdSelector = createSelector(
    [parkingsSelector, getProps], (parkings, id) => {
        var parking =  parkings.find(_=>_.id.toString() == id);
        
        if(!parking)
            throw console.error("no id found");
        
        return parking;
    }
);