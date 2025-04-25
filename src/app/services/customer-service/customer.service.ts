import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerState } from '../../model/customer';
import { MOCK_CUSTOMERS } from '../../mock-trackers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://46c5073b-cf3d-486b-85d4-7d4850dc9a92.mock.pstmn.io';
  
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
          let obs = new Observable<Customer[]>((subscriber) => {
              setTimeout(() => {
                  subscriber.next(MOCK_CUSTOMERS);
                  subscriber.complete();
              }, 1000);
          })
          return obs;
      }

  fetchCustomer(): Observable<CustomerState[]> {
    return this.http.get<CustomerState[]>(`${this.apiUrl}/api/customer`)
  }

  registerCustomer(data:CustomerState) {    
    return this.http.post<CustomerState>(`${this.apiUrl}/api/customer`, data)
  }
}
