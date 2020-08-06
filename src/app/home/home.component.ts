import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Trips } from '../store/trips/trips.actions';
import { ITripsDetails } from '../store/trips/trips.model';
import { TripDetailsState } from '../store/trips/trips.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(TripDetailsState.getTrips)
  public trips$: Observable<ITripsDetails[]>;

  public selectedTripID: number;
  public selectedTrip: ITripsDetails[];
  public show: boolean = true;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  public createTrip() {
    const trip: ITripsDetails = {
      id: 0,
      destination: 'Lavda',
      start: new Date(),
      duration: 7,
      comments: 'Gorgeous',
    }
    this.store.dispatch(new Trips.Create(trip));
    this.selectedTripID = trip.id;
  }

  public deleteTrip() {
    this.store.dispatch(new Trips.Delete(this.selectedTripID))
  }

  public getSelectedTrip(tripID: number) {
    this.selectedTripID = tripID;
  }

  public getTripDescription(comment: string) {
    let tripDetails: ITripsDetails = {
      id: 0,
      destination: 'Lavda',
      start: new Date(),
      duration: 7,
      comments: comment,
    }
    this.store.dispatch(new Trips.Update(this.selectedTripID, tripDetails));
  }

  public toggleDropdown() {
    if (screen.width <= 767) {
      this.show = !this.show;
    }
  }
}
