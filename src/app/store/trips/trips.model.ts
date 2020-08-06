export interface TripsDetailsStateModel {
  Trips: ITripsDetails[];
}

export interface ITripsDetails {
  id: number;
  destination: string;
  start: Date | string;
  duration: number;
  comments: string;
  color?: string;
}