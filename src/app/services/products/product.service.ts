import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../model/products';
import { MOCK_PRODUCTS } from '../../mock-trackers';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getMockProducts(): Observable<Products[]> {
    let obs = new Observable<Products[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(MOCK_PRODUCTS);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }
}
