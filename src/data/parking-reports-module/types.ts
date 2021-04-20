import * as actions from "./actions.types";
import { ActionCreator } from "../common/types";
import {Parking} from "../parkings-module/types";

interface ParkingReportBaseline {
  id: number;
  reportDate: Date;
}

export type ParkingReport = ParkingReportBaseline & {
  parking: number;
}

export interface ParkingReortrsState {
  parkingReports: ParkingReport[];
}

export type FullParkingReport = ParkingReportBaseline & {
  parking: Parking;
}

export type ParkingReportActionCreator<P> = ActionCreator<keyof typeof actions, P>;
export type ParkingReportAction = ReturnType<ParkingReportActionCreator<never>>;
