import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITripsDetails } from '../store/trips/trips.model';

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

  constructor() { }

  ngOnInit() {
  }

  public openTrip() {
    this.selectedTripEvent.emit(this.trips.id);
  }
}
