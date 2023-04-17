import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http :HttpClient) { }

  getProducts() {
    return this.http.post<any>('https://bc096ti86i.execute-api.us-east-1.amazonaws.com/Prod/products', null);    
  }
}
