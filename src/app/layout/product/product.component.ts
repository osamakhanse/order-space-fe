import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product-service/product.service';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  products : any;
  loadingFlag = true;

  constructor(private productService : ProductService, private cartService: CartService) { }

  ngOnInit(): void {

    this.loadingFlag = true;
    this.productService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;
      this.loadingFlag = false;
    });
  }

  addToCart(product: any) {
    let item = {
      "rowId": product.rowId,
      "productId": product.productId,
      "productName": product.productName,
      "productCategory": product.productCategory,
      "unitPrice": product.productPrice,
      "productImageUrl": product.productImageUrl,
      "productDescription": product.productDescription,
      "quantity": 1,
      "totalPrice": product.productPrice,
      "productWeight": product.productWeight,
      "totalWeight": product.productWeight
  }
    console.log(item);
    this.cartService.addToCart(item);
  }

}
