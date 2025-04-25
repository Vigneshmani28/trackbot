import { Injectable, OnInit } from '@angular/core';
import { MockTracker, Tracker } from '../../model/tracker';
import { MarkerPlayback, MOCK_MARKERS, MOCK_TRACKER, TRACKERS } from '../../mock-trackers';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, delay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../../model/base_response';
import { BasePageResponse } from '../../model/BasePageResponse';

@Injectable({
  providedIn: 'root',
})
export class TrackersService {
  readonly REFRESH_TIME = 15 * 1000;

  constructor(private http: HttpClient) {}

  trackers(): Observable<Tracker[]> {
    return this.http.get<Tracker[]>(environment.apiBaseUrl + 'v1/device/all');
  }

  getMockTracker(): Observable<MockTracker[]> {
    let obs = new Observable<MockTracker[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(MOCK_TRACKER);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

  getTracker(): Observable<MarkerPlayback[]> {
    let obs = new Observable<MarkerPlayback[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(MOCK_MARKERS);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

  createTracker(deviceName: string, companyId: number): Observable<Tracker> {
    return this.http.post<Tracker>(
      environment.apiBaseUrl + 'v1/device/create',
      {
        name: deviceName,
        companyId: companyId,
      }
    );
  }

  getPlaybackDetails(
    start: string,
    end: string,
    trackerId: string
  ): Observable<Tracker[]> {
    return this.http.get<Tracker[]>(
      environment.apiBaseUrl + 'v1/device-location/device/' + trackerId,
      {
        params: {
          startTime: start,
          endTime: end,
        },
      }
    );
  }

  downloadReport(
    trackerId: string,
    pageSize: number,
    pageNumber: number
  ): Observable<BasePageResponse> {
    return this.http.get<BasePageResponse>(
      environment.apiBaseUrl + 'v1/device-location/report/device/' + trackerId,
      {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
        },
      }
    );
  }

  deleteTracker(id: string): Observable<BaseResponse> {
    return this.http.delete(environment.apiBaseUrl + 'v1/device/' + id);
  }

  assignTrackerToACompany(
    trackerId: string,
    companyId: string
  ): Observable<Tracker> {
    return this.http.post<Tracker>(
      environment.apiBaseUrl +
        'v1/device/' +
        trackerId +
        '/assign/company/' +
        companyId,
      {}
    );
  }
}
