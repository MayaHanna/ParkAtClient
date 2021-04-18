import * as actions from "./actions.types";
import { ActionCreator } from "../common/types";

// type SuitableFor = "motorcycle" | "car" | "truck";
type Size = "Small" | "Big";
// type Parking_Status = "Free" | "Taken";

export interface Comment {
  rating: number;
  content: string;
  publisher: string;
  publisherName: string;
}

export interface Parking {
  id: number;
  address: string;
  isPrivate: boolean;
  description: string;
  name: string;
  // suittableFor: SuitableFor,
  size: Size;
  // status: Parking_Status;
  owner: string;
  comments: Comment[]
}
export interface ParkingsState {
  parkings: Parking[];
}

export type ParkingActionCreator<P> = ActionCreator<keyof typeof actions, P>;
export type ParkingAction = ReturnType<ParkingActionCreator<never>>;
