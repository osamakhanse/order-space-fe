import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { OrderDetailsService } from 'src/app/shared/order-details-service/order-details.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any;
  cartTotal = 0;
  totalCartWeight = 0;
  isCheckoutVisible=true;
  riders: any;
  selectedRider: any;

  constructor(private cartService: CartService, private orderService : OrderDetailsService, public router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    console.log("cart = ", this.cartItems);
    this.cartService.getRiders().subscribe(response => {
      this.riders = JSON.parse(response.body);
      console.log("riders => ", this.riders);
    })
    this.calculateCartTotal();
  }

  calculateCartTotal() {
    this.cartTotal = 0;
    this.totalCartWeight = 0;
    for(let i = 0; i < this.cartItems.length; i++) {
      this.cartTotal = parseFloat(this.cartItems[i].totalPrice) + this.cartTotal;
      this.totalCartWeight = this.totalCartWeight + parseFloat(this.cartItems[i].totalWeight);
    }
  }
  removeFromCart(item: any) {
    console.log("here");
    this.cartService.clearCart();
    this.cartItems = this.cartService.getItems();
    console.log("cart = ", this.cartItems);
  }
  decreaseQty(item: any) {
    console.log(item);
    let index = 0;
    for(let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].rowId == item.rowId && this.cartItems[i].quantity > 1) {
        index = i;
        this.cartItems[i].quantity = this.cartItems[i].quantity - 1;
        this.cartItems[i].totalWeight = this.cartItems[i].quantity * this.cartItems[i].productWeight;
        this.calculateItemSubTotal(index);
        this.calculateCartTotal();
      }
    }
    
  }

  increaseQty(item: any) {
    console.log(item);
    let index = 0;
    for(let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].rowId == item.rowId) {
        index = i;
        this.cartItems[i].quantity = this.cartItems[i].quantity + 1;
        this.cartItems[i].totalWeight = this.cartItems[i].quantity * this.cartItems[i].productWeight;
        this.calculateItemSubTotal(index);
        this.calculateCartTotal();
      }
    }
  }

  calculateItemSubTotal(index: number) {
    this.cartItems[index].totalPrice = this.cartItems[index].unitPrice * this.cartItems[index].quantity;
  }

  checkout(): void {
    // TODO: implement checkout logic
    this.isCheckoutVisible = false;
  }

  confirmOrder() {
    console.log("selected rider => ", this.selectedRider);
    let orderData = this.prepareOrderData();
    console.log("orderData => ", orderData);
    let orderProducts = this.prepareOrderProducts();
    console.log("orderProducts => ", orderProducts);
    this.orderService.createOrder(orderData, orderProducts).subscribe(response => {
      let deliveryData = this.prepareDeliveryRequest(response, orderData);
      console.log("order response => ", response);
      console.log("delivery data => ", deliveryData);
      this.orderService.createDelivery(deliveryData).subscribe(response1 => {
        console.log("delivery response => ", response1);
        this.router.navigate(['/order-space/orders']);
      })
    })
  }

  prepareOrderData() {
    let userString : any = localStorage.getItem("user_details");
    if(userString) {
      let user = JSON.parse(userString);
      console.log("user = ",user);
    let orderData = {
      "userName": user.userEmail,
      "orderDateTime": "2023-04-10 12:30:00",
      "orderTotal": this.cartTotal,
      "orderStatus": "Processing",
      "riderId": this.selectedRider.id,
      "riderName": this.selectedRider.fullName,
      "riderTimeSlot": "2023-04-10 15:00:00",
      "totalWeight" : this.totalCartWeight
    }
    return orderData;
    }
    return null;
  }

  prepareOrderProducts() {
    let orderProducts = [];
    for(let i = 0; i < this.cartItems.length; i++) {
      let orderProduct = {
        "productId": this.cartItems[i].productId,
        "quantity": this.cartItems[i].quantity,
        "orderProductDescription": this.cartItems[i].productDescription,
        "totalPrice": this.cartItems[i].totalPrice,
        "unitPrice": this.cartItems[i].unitPrice,
        "productImageUrl": this.cartItems[i].productImageUrl,
        "productName": this.cartItems[i].productName
      }
      orderProducts.push(orderProduct);
    }
    return orderProducts;
  }

  prepareDeliveryRequest(response:any, orderData:any) {
    let userString : any = localStorage.getItem("user_details");
    if(userString) {
      let user = JSON.parse(userString);
      console.log("user = ",user);
    let deliveryData = {
      "origin":"Order Space Office, Swords, Co. Dublin",
      "destination":user.userAddress,
      "order_nr":response.orderNumber,
      "weight": orderData.totalWeight,
      "dimensions":"10x20x25",
      "type":"fragile",
      "customer_info":{
         "name":user.name,
         "number":user.userPhoneNumber,
         "email":user.userEmail
      },
      "rider_id":this.selectedRider.id,
      "comment":"please deliver it ASAP"
   }
   return deliveryData;
  }
  return null;
  }

}
