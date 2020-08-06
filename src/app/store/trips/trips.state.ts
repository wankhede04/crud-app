import { State, StateContext, Selector, Action, createSelector } from '@ngxs/store';
import { ITripsDetails, TripsDetailsStateModel } from './trips.model';
import { Trips } from './trips.actions';
import { TripsService } from '../../service/trips.service';
import { tap } from 'rxjs/operators';

const INITIAL_STATE_DETAILS: TripsDetailsStateModel = {
  Trips: []
};

@State<TripsDetailsStateModel>({
  name: 'trips',
  defaults: INITIAL_STATE_DETAILS
})
export class TripDetailsState {
  constructor(private tripsService: TripsService) {}

  @Selector()
  public static getTrips(state: TripsDetailsStateModel) {
    return state.Trips;
  }

  @Action(Trips.Get)
  public getTripList(ctx: StateContext<TripsDetailsStateModel>, action: Trips.Get) {
    const state = ctx.getState();

    return this.tripsService.getTripsDetails().pipe(
      tap((response) => {
        return ctx.setState({
          ...state,
          Trips: response
        });
      })
    );
  }

  @Action(Trips.Create)
  public createTrip(ctx: StateContext<TripsDetailsStateModel>, action: Trips.Create) {
    const state = ctx.getState();

    return this.tripsService.createTrip(action.tripDetails).pipe(
      tap((response) => {
        return ctx.patchState({
          Trips: [...state.Trips, action.tripDetails]
        });
      })
    );
  }

  @Action(Trips.Update)
  public updateTrip(ctx: StateContext<TripsDetailsStateModel>, action: Trips.Update) {
    let state = ctx.getState();

    return this.tripsService.updateTrip(action.tripDetails).pipe(
      tap((response) => {
        const tripList: ITripsDetails[] = [ ...state.Trips ];
        const tripIndex = tripList.findIndex(trip => trip.id === action.tripID);
        tripList[tripIndex] = response;

        return ctx.setState({
          ...state,
          Trips: tripList
        });
      })
    );
  }

  @Action(Trips.Delete)
  public deleteTrip(ctx: StateContext<TripsDetailsStateModel>, action: Trips.Delete) {
    let state = ctx.getState();

    return this.tripsService.deleteTrip(action.tripID).pipe(
      tap((response) => {
        const filteredArray = state.Trips.filter(trip => trip.id !== action.tripID);

        return ctx.setState({
          ...state,
          Trips: filteredArray
        });
      })
    );
  }
}
