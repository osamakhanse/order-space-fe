import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items : any = [];

  constructor(private http :HttpClient) { }

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(item: any): void {
      this.items.push(item);
  }

  clearCart(): void {
    this.items = [];
  }

  getRiders() {
        return this.http.get<any>('https://w7rdhz2t8l.execute-api.us-east-1.amazonaws.com/production/getAvailableRiders');
  }
}
