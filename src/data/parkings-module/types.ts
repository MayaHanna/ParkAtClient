import * as actions from "./actions.types";
import { ActionCreator } from "../common/types";

type Size = "Small" | "Big";
type Parking_Status = "Free" | "Taken";

export interface Parking {
  id: number;
  address: string;
  isPrivate: boolean;
  description: string;
  size: Size;
  status: Parking_Status;
  owner: number;
  price: number;
  start: Date;
  end: Date;
}
export interface ParkingsState {
  parkings: Parking[];
}

export type ParkingActionCreator<P> = ActionCreator<keyof typeof actions, P>;
export type ParkingAction = ReturnType<ParkingActionCreator<never>>;
