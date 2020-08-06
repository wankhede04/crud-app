import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITripsDetails } from '../store/trips/trips.model';
import { Trips } from '../store/trips/trips.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-trip-metadata',
  templateUrl: './trip-metadata.component.html',
  styleUrls: ['./trip-metadata.component.scss']
})
export class TripMetadataComponent implements OnInit {

  @Input()
  public trips: ITripsDetails;

  @Output()
  public selectedTripEvent: EventEmitter<number> = new EventEmitter();

  public destination: string;
  public comment: string;

  constructor(private store: Store) { }

  ngOnInit() {
    this.destination = this.trips.destination;
    this.comment = this.trips.comments;
  }

  public openTrip() {
    this.selectedTripEvent.emit(this.trips.id);
  }

  public deleteTrip(tripID: number) {
    this.store.dispatch(new Trips.Delete(tripID));
  }

  public updateTripdetails(tripValue: string) {
    console.log(this.destination, 'destination')
    console.log(this.comment, 'comment')
    const tripdetails: ITripsDetails = {
      id: this.trips.id,
      destination: this.destination,
      start: this.trips.start,
      duration: this.trips.duration,
      comments: this.comment
    }
    this.store.dispatch(new Trips.Update(this.trips.id, tripdetails))
  }
}
