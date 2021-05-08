import * as actions from "./actions.types";
import { ActionCreator } from "../common/types";
import {Parking} from "../parkings-module/types";
import { Coords } from "google-map-react";

type Parking_Offer_Status = "Open" | "Closed";
interface ParkingOfferBaseline {
  id: number;
  price: number;
  start: Date;
  end: Date;
  isPermanent: boolean
  merchantId: string;
  status: Parking_Offer_Status;
  client?: string;
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

export type ParkingOffersMapParams = {
  maxPrice?: number;
  ignorePrivate: boolean;
  ignorePublic: boolean;
  maxDistanceFromCenter: number;
  centerLocation: Coords;
}