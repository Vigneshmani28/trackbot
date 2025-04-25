import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, CompanyState } from '../../model/company';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'https://46c5073b-cf3d-486b-85d4-7d4850dc9a92.mock.pstmn.io';

  constructor(private http: HttpClient) { }

  getCompanies() : Observable<Company[]>{
    return this.http.get<Company[]>(environment.apiBaseUrl + "v1/company/all")
  }

  fetchCompanies() : Observable<CompanyState[]>{
    return this.http.get<CompanyState[]>(`${this.apiUrl}/api/company`)
  }

  createCompany(companyName: string, contactPhoneNumer: string, contactEmailId: string, contactPersonName: string){
    return this.http.post<Company>(environment.apiBaseUrl + "v1/company/create", {
      companyName: companyName,
      contactPersonName: contactPhoneNumer,
      contactEmailId: contactEmailId,
      contactPhoneNumber: contactPersonName
    })
  }

  registerCompany(data: CompanyState){
    return this.http.post<CompanyState>(`${this.apiUrl}/api/company`, data)
  }

}
