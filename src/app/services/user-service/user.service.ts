import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../model/company';
import { MockSubUsers, MockUsers, Role, User } from '../../model/user';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../auth-service/auth.service';
import { BaseResponse } from '../../model/base_response';
import { MOCK_SUB_USERS, MOCK_USERS } from '../../mock-trackers';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //TODO Handle this undefined. companyId will not be undefined
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiBaseUrl + 'v1/user/all');
  }

  getMockUserList(): Observable<MockUsers[]> {
    let obs = new Observable<MockUsers[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(MOCK_USERS);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

  getMockSubUserList(): Observable<MockSubUsers[]> {
    let obs = new Observable<MockSubUsers[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(MOCK_SUB_USERS);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

  createUser(
    name: string,
    email: string,
    phoneNumber: string,
    companyId: number,
    roles: Role[]
  ): Observable<User> {
    return this.http.post<User>(environment.apiBaseUrl + 'v1/auth/register', {
      email: email,
      password: 'password',
      name: name,
      companyId: companyId,
      roles: roles,
      phoneNumber: phoneNumber,
    });
  }

  deleteUser(user: User): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(
      environment.apiBaseUrl + 'v1/user/' + user.userId
    );
  }

  // allocateDevice(user: User): Observable<BaseResponse>{
  //   return
  // }
}
