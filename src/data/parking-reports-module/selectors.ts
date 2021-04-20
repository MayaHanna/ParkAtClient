import { RootState } from "../configureStore";
import {createSelector} from "reselect";
import {parkingsSelector} from "../parkings-module/selectors";
import {FullParkingReport} from "./types";

export const getProps = (state: RootState, props: any) => props;

export const parkingReportsSelector = (state: RootState) =>
  state.ParkingReports.parkingReports;


export const fullParkingReportsSelector = createSelector(
    [parkingsSelector, parkingReportsSelector],
    (parkings, parkingsOffers) => {
        return parkingsOffers.map(po => {
            return {
                ...po,
                parking: parkings.find(p => p.id === po.parking)
            }
        })
    }
);