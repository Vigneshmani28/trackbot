import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcknowledgeBottomSheetService {
  private measureDistanceSubject = new BehaviorSubject<boolean>(true);
  measureDistance$ = this.measureDistanceSubject.asObservable();

  setMeasureDistance(value: boolean) {
    this.measureDistanceSubject.next(value);
  }
}
