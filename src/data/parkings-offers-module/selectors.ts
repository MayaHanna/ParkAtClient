import { RootState } from "../configureStore";
import {createSelector} from "reselect";
import {parkingsSelector} from "../parkings-module/selectors";
import {FullParkingOffer} from "./types";

export const getProps = (state: RootState, props: any) => props;

export const parkingsOffersSelector = (state: RootState) =>
  state.ParkingsOffers.parkingsOffers;


export const fullParkingsOffersSelector = createSelector(
    [parkingsSelector, parkingsOffersSelector],
    (parkings, parkingsOffers) => {
        return parkingsOffers.map(po => {
            return {
                ...po,
                parking: parkings.find(p => p.id === po.parking)
            }
        })
    }
);

export const fullParkingsOffersWithFilterSelector = createSelector(
    [fullParkingsOffersSelector, getProps], (parkingsOffers: FullParkingOffer[], props) => {
        return parkingsOffers.filter(po => {
            return (po.parking?.description.includes(props.searchText) || po.parking?.address.includes(props.searchText))
        })
    }
);

export const fullParkingsOffersWithIdSelector = createSelector(
    [fullParkingsOffersSelector, getProps], (parkingsOffers: FullParkingOffer[], id) => {
        var parking =  parkingsOffers.find(_=>_.id.toString() == id);
        
        if(!parking)
            throw console.error("no id found");
        
        return parking;
    }
);