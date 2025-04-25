import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, CompanyState } from '../../model/company';
import { COMPANIES } from '../../mock-trackers';
import { MOCK_COMPANIES } from '../../mock-trackers';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    constructor(private http: HttpClient) { }

    getCompanies(): Observable<CompanyState[]> {
        let obs = new Observable<CompanyState[]>((subscriber) => {
            setTimeout(() => {
                subscriber.next(MOCK_COMPANIES);
                subscriber.complete();
            }, 1000);
        })
        return obs;
    }
    
}
