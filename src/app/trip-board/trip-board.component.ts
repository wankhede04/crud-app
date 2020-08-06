import { Component, OnInit, Output, EventEmitter, Input, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { ITripsDetails } from '../store/trips/trips.model';
import {NgbDateStruct, NgbCalendar, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trip-board',
  templateUrl: './trip-board.component.html',
  styleUrls: ['./trip-board.component.scss']
})
export class TripBoardComponent implements OnInit {
  @ViewChild('dp') calendarDate: NgbDatepicker;

  @Output()
  public tripDetailsEvent: EventEmitter<string> = new EventEmitter();

  @Input()
  public allTrips: ITripsDetails[];

  @Input()
  public currentTripID: number;

  model: NgbDateStruct;
  date: {year: number, month: number};
  public currentTrip: any;

  constructor(private calendar: NgbCalendar) {
    this.model = this.calendar.getToday();
  }

  ngOnInit() {}

  ngOnChanges(changes?: SimpleChange) {
    this.currentTrip = this.allTrips.filter(trip => trip.id === this.currentTripID);
    if(this.currentTrip.length) {
      const date = new Date(this.currentTrip[0].start);
      this.model = {
        'day': date.getDate(),
        'month': date.getMonth() + 1,
        'year': date.getFullYear()
      }
      this.calendarDate.navigateTo(this.model);
    }
  }

  public tripValue(event: string) {
    const selectedDate = new Date(`${this.date.year} ${this.date.month} ${event}`).toISOString();
    this.tripDetailsEvent.emit(selectedDate);
  }
}
