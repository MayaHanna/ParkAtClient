import { RootState } from "../configureStore";
import { createSelector } from "reselect";
import { Parking } from "./types";

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

export const parkingsWithIdSelector = createSelector(
    [parkingsSelector, getProps], (parkings, id) => {
        return parkings.find(p => p.id.toString() == id);
    }
);

export const parkingsWithOwnerSelector = createSelector(
    [parkingsSelector, getProps], (parkings: Parking[], ownerId) => {
        return parkings.filter(p => p.owner.toString() == ownerId);
    }
);

export const publicParkingsSelector = createSelector(
    [parkingsSelector], (parkings: Parking[]) => {
        return parkings.filter(p => !p.isPrivate);
    }
);