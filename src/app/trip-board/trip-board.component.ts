import { Component, OnInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isEmpty } from 'lodash';
import { ITripsDetails } from '../store/trips/trips.model';

@Component({
  selector: 'app-trip-board',
  templateUrl: './trip-board.component.html',
  styleUrls: ['./trip-board.component.scss']
})
export class TripBoardComponent implements OnInit {

  @Output()
  public tripDetailsEvent: EventEmitter<string> = new EventEmitter();

  @Input()
  public allTrips: ITripsDetails[];

  @Input()
  public currentTripID: number;

  private _selectedDate: BehaviorSubject<string> = new BehaviorSubject('');

  public get selectedDate(): string {
    return this._selectedDate.getValue();
  }

  public set selectedDate(inputValue: string) {
    this._selectedDate.next(inputValue);
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange) {
    let currentTrip = this.allTrips.filter(trip => trip.id === this.currentTripID);
  }

  public tripValue() {
    this.tripDetailsEvent.emit(this.selectedDate);
  }

}
