import { ITripsDetails } from './trips.model';

export namespace Trips {
  export class Get {
    static readonly type = '[Trip] Get Trips';
  }

  export class Create {
    static readonly type = '[Trip] Create Trip';
    constructor(public tripDetails: ITripsDetails) {}
  }

  export class Update {
    static readonly type = '[Trip] Update Trip';
    constructor(public tripID: number, public tripDetails: ITripsDetails) {}
  }

  export class Delete {
    static readonly type = '[Trip] Delete Trip';
    constructor(public tripID: number) {}
  }
}