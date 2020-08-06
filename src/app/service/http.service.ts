import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  public GET(url: string): Observable<IHttpResponse | any> {
    return this.http.get(url).pipe(
        tap((res: IHttpResponse) => res),
        catchError(this.handleError)
    );
  }

  public POST(url: string, body: any) {
    return this.http.post(url, body).pipe(
        tap((res: IHttpResponse) => res),
        catchError(this.handleError)
    );
  }

  public PUT(url: string, body: any) {
    return this.http.put(url, body).pipe(
        tap((res: IHttpResponse) => res),
        catchError(this.handleError)
    );
  }

  public DELETE(url: string) {
    return this.http.delete(url).pipe(
        tap((res: IHttpResponse) => res),
        catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return observableThrowError(error.error || 'Server error-layout');
  }
}

export interface IHttpResponse {
  success: boolean;
  status: number;
  message: string;
  data?: any;
}
