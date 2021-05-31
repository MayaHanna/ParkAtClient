import { RootState } from "../configureStore";
import {createSelector} from "reselect";
import {parkingsSelector} from "../parkings-module/selectors";
import {FullParkingOffer, ParkingOffersMapParams} from "./types";

export const getProps = (state: RootState, props: any) => props;

export const parkingsOffersSelector = (state: RootState) =>{
    return state.ParkingsOffers.parkingsOffers;
}


export const fullParkingsOffersSelector = createSelector(
    [parkingsSelector, parkingsOffersSelector],
    (parkings, parkingsOffers) => {
        return parkingsOffers.map(po => {
            return {
                ...po,
                parking: parkings.find(p => p.id === po?.parkingId)
            }
        })
    }
);

export const fullParkingsOffersWithFilterSelector = createSelector(
    [fullParkingsOffersSelector, getProps], (parkingsOffers: FullParkingOffer[], props) => {
        return parkingsOffers
        .filter(po => 
            (!props?.maxPrice || po.price <= props?.maxPrice) && 
            (!props?.ignorePrivate || (props.ignorePrivate && !po.parking.isPrivate)) &&
            (!props?.ignorePublic || (props.ignorePublic && po.parking.isPrivate)) 
        )
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

export const fullParkingsOffersWithOwnerSelector = createSelector(
    [fullParkingsOffersSelector, getProps], (parkingsOffers: FullParkingOffer[], owner) => {
        const parking: FullParkingOffer[] =  parkingsOffers.filter(_=>_.parking?.owner.toString() == owner);
    
        return parking;
    }
);


export const fullParkingsOffersWithClientSelector = createSelector(
    [fullParkingsOffersSelector, getProps], (parkingsOffers: FullParkingOffer[], client) => {
        const parking: FullParkingOffer[] =  parkingsOffers.filter(_=> _.status == "Closed" && _.client == client);

        return parking;
    }
);
