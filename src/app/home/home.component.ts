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
  public selectedTrip: ITripsDetails;
  public show: boolean = true;

  constructor(private store: Store) {
    this.store.dispatch(new Trips.Get);
  }

  ngOnInit() {
  }

  public deleteTrip() {
    this.store.dispatch(new Trips.Delete(this.selectedTripID))
  }

  public getSelectedTrip(tripID: number) {
    this.selectedTripID = tripID;
    this.trips$.subscribe(trip => {
      this.selectedTrip = trip.filter(trip => trip.id === tripID)[0];
    });
  }

  public getTripDescription(selectedDate: string) {
    let tripDetails: ITripsDetails = {
      id: this.selectedTrip.id,
      destination: this.selectedTrip.destination,
      start: selectedDate,
      duration: this.selectedTrip.duration,
      comments: this.selectedTrip.comments ? this.selectedTrip.comments : '',
    }
    this.store.dispatch(new Trips.Update(this.selectedTripID, tripDetails));
  }

  public toggleDropdown() {
    if (screen.width <= 767) {
      this.show = !this.show;
    }
  }
}
