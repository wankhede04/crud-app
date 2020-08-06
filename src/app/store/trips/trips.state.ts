import { State, StateContext, Selector, Action, createSelector } from '@ngxs/store';
import { ITripsDetails, TripsDetailsStateModel } from './trips.model';
import { Trips } from './trips.actions';

const INITIAL_STATE_DETAILS: TripsDetailsStateModel = {
  Trips: []
};

@State<TripsDetailsStateModel>({
  name: 'trips',
  defaults: INITIAL_STATE_DETAILS
})
export class TripDetailsState {
  constructor() {}

  @Selector()
  public static getTrips(state: TripsDetailsStateModel) {
    return state.Trips;
  }

  @Action(Trips.Get)
  public getTripList(ctx: StateContext<TripsDetailsStateModel>, action: Trips.Get) {
    const state = ctx.getState();

    return ctx.setState({
      ...state
    });
  }

  @Action(Trips.Create)
  public createTrip(ctx: StateContext<TripsDetailsStateModel>, action: Trips.Create) {
    const state = ctx.getState();

    return ctx.patchState({
      Trips: [...state.Trips, action.tripDetails]
    });
  }

  @Action(Trips.Update)
  public updateTrip(ctx: StateContext<TripsDetailsStateModel>, action: Trips.Update) {
    let state = ctx.getState();

    const tripList = [ ...state.Trips ];
    const tripIndex = tripList.findIndex(trip => trip.id === action.tripID);
    tripList[tripIndex] = action.tripDetails;

    return ctx.setState({
      ...state,
      Trips: tripList
    });
  }

  @Action(Trips.Delete)
  public deleteTrip(ctx: StateContext<TripsDetailsStateModel>, action: Trips.Delete) {
    let state = ctx.getState();

    const filteredArray = state.Trips.filter(trip => trip.id !== action.tripID);

    return ctx.setState({
      ...state,
      Trips: filteredArray
    });
  }
}
