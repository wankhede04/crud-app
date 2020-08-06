import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService, IHttpResponse } from './http.service';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { ITripsDetails } from '../store/trips/trips.model';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private httpService: HttpService, private store: Store) { }

  public getTripsDetails(): Observable<[]> {
    return this.httpService.GET(`${environment.serverUrl}${environment.apiPrefix}`);
  }

  public createTrip(payload: ITripsDetails): Observable<[]> {
    return this.httpService.POST(`${environment.serverUrl}${environment.apiPrefix}${payload.id}`, payload);
  }

  public updateTrip(payload: ITripsDetails): Observable<ITripsDetails> {
    return this.httpService.PUT(`${environment.serverUrl}${environment.apiPrefix}${payload.id}`, payload);
  }

  public deleteTrip(id: number): Observable<[]> {
    return this.httpService.DELETE(`${environment.serverUrl}${environment.apiPrefix}${id}`);
  }
}
