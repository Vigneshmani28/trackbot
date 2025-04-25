import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuEnum } from '../../model/tracker';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private selectedMenu = new BehaviorSubject<string>(MenuEnum.TRACKERS)

  selectedMenu$ = this.selectedMenu.asObservable();

  constructor() { }

  setMenu(menu: string): void {
    this.selectedMenu.next(menu);
  }
}
