import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TEST_USER } from '../../mock-trackers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  readonly TOKEN = "TOKEN"
  isLoggedIn: boolean = false
  user: User | undefined

  get token() : string {
    return localStorage.getItem(this.TOKEN) ?? ""
  }

  login(username: string , password: string) : Observable<AuthResponse> {
    this.user = TEST_USER
    return of({
      user: TEST_USER,
      token: "asdfljasldf.laskjdfla"
    })
  }

}

export interface AuthResponse{
  token: string,
  user: User
}