import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role, User } from '../../model/user';
import { TEST_USER, USERS } from '../../mock-trackers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserList(): Observable<User[]>{
    return new Observable((subscriber) => {
        setTimeout(()=>{
          subscriber.next(USERS);
          subscriber.complete();
      }, 1000);
      })
  }
  
  createUser(name:string, email: string, phoneNumber: string, companyId: number, roles: Role[]): Observable<User>{
    return of(TEST_USER)
  }

}