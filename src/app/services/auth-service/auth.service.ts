import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    console.log("auth service constructor")
  }

  readonly TOKEN = "TOKEN"
  readonly USER_DETAILS = "USER_DETAILS"
  isLoggedIn: boolean = false

  get token(): string | undefined {
    return localStorage.getItem(this.TOKEN) ?? undefined
  }

  get user(): User | undefined {
    let userDetails = localStorage.getItem(this.USER_DETAILS) ?? undefined
    if(userDetails){
      return JSON.parse(userDetails)
    }
    return undefined
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiBaseUrl + "v1/auth/authenticate", {
      email: username,
      password: password
    }).pipe(
      tap(it => {
        this.isLoggedIn = true;
        localStorage.setItem(this.USER_DETAILS, JSON.stringify({
          name : 'admin',
          userId : '6646e314164549f91aba0f0f',
          phoneNumber : null,
          company : null,
          role : [
            // 'SuperAdmin',
            'CompanyAdmin',
            // 'CustomerAdmin'
            // 'CustomerUser'
          ]
        }));
        localStorage.setItem(this.TOKEN, it.token);
      })
    )
  }

  // login(username: string, password: string): Observable<AuthResponse> {
  //   return this.http.post<AuthResponse>(environment.apiBaseUrl + "v1/auth/authenticate", {
  //     email: username,
  //     password: password
  //   }).pipe(
  //     tap(it => {
  //       this.isLoggedIn = true;
  //       localStorage.setItem(this.USER_DETAILS, JSON.stringify(it.user));
  //       localStorage.setItem(this.TOKEN, it.token);
  //     })
  //   )
  // }

  logout(){
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.USER_DETAILS);
  }

}

export interface AuthResponse {
  token: string,
  user: User
}