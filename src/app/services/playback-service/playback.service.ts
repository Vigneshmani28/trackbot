import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {
  private playEvent = new Subject<void>();
  private pauseEvent = new Subject<void>();
  private fastForwardEvent = new Subject<number | void>();
  private reverseEvent = new Subject<void>();
  private showFullRouteEvent = new Subject<void>();
  private moveMapEvent = new Subject<boolean>(); 

  play$ = this.playEvent.asObservable();
  pause$ = this.pauseEvent.asObservable();
  fastForward$ = this.fastForwardEvent.asObservable();
  reverse$ = this.reverseEvent.asObservable();
  showFullRoute$ = this.showFullRouteEvent.asObservable();
  moveMap$ = this.moveMapEvent.asObservable(); 

  play() {
    this.playEvent.next();
  }

  pause() {
    this.pauseEvent.next();
  }

  fastForward(speed?:number) {
    if(speed){
      this.fastForwardEvent.next(speed);
    } else {
      this.fastForwardEvent.next();
    }
  }

  reverse() {
    this.reverseEvent.next();
  }

  setMoveMap(value: boolean) {  
    this.moveMapEvent.next(value);
  }

  showFullRoute() {
    this.showFullRouteEvent.next();
  }
}
