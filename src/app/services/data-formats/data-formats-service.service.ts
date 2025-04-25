import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataFormats } from '../../model/data-formats';
import { MOCK_DATA_FORMATS } from '../../mock-trackers';

@Injectable({
  providedIn: 'root',
})
export class DataFormatsServiceService {
  constructor() {}

  getMockDataFormats(): Observable<DataFormats[]> {
    let obs = new Observable<DataFormats[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(MOCK_DATA_FORMATS);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }
}
