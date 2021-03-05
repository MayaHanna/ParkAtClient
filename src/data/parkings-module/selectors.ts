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
    [parkingsSelector, getProps], (parkings, props) => {
        debugger;
        return parkings.find(_=>_.id.toString() == props.id);
    }
);