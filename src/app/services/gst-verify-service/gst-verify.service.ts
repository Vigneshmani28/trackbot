import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GST_State } from '../../model/gst';

@Injectable({
  providedIn: 'root'
})
export class GstVerifyService {
  apiKey = '9f76fcf8d5f0a8bf510f85878b870601';

  constructor(private http: HttpClient) { }

  checkGST(gstNumber: string): Observable<GST_State> {
    return this.http.get<GST_State>(`https://46c5073b-cf3d-486b-85d4-7d4850dc9a92.mock.pstmn.io/api/verifyGST?gstNumber=${gstNumber}`)
  }
}
