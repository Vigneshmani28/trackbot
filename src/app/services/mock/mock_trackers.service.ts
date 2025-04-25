import { Injectable } from '@angular/core';
import { Tracker } from '../../model/tracker';
import { PLAYBACK_LIST, TRACKERS } from '../../mock-trackers';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackersService {
  constructor(private http: HttpClient) { 
    setTimeout(() => {
      this._trackers$.next(TRACKERS)
      setTimeout(() => {
        this._trackers$.next(TRACKERS)
      }, 10* 1000)
    }, 10 * 1000)
  }
  
  private _trackers$ = new BehaviorSubject(TRACKERS);

  trackers(): Observable<Tracker[]>{
    return this._trackers$.asObservable()
  }

  getPlaybackDetails(): Observable<Tracker[]>{
    return new Observable((subscriber) => {
      setTimeout(()=>{
        subscriber.next(PLAYBACK_LIST);
        subscriber.complete();
    }, 1000);
    })
  }

}
