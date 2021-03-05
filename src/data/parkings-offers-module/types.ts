import * as actions from "./actions.types";
import { ActionCreator } from "../common/types";
import {Parking} from "../parkings-module/types";

interface ParkingOfferBaseline {
  id: number;
  price: number;
  start: Date;
  end: Date;
}

export type ParkingOffer = ParkingOfferBaseline & {
  parking: number;
}

export interface ParkingsOffersState {
  parkingsOffers: ParkingOffer[];
}

export type FullParkingOffer = ParkingOfferBaseline & {
  parking: Parking;
}

export type ParkingOfferActionCreator<P> = ActionCreator<keyof typeof actions, P>;
export type ParkingOfferAction = ReturnType<ParkingOfferActionCreator<never>>;