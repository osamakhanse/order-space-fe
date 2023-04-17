import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, ORDERS } from '../../shared/models/order';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderDetailsService } from '../../shared/order-details-service/order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderNumber!: any;
  order !: any;
  loadingFlag = true;
  constructor(private route: ActivatedRoute, private orderService: OrderDetailsService) { }

  ngOnInit(): void {
    this.loadingFlag = true;
    this.route.paramMap.subscribe(params => {
      this.orderNumber = params.get('orderNumber');
      console.log("ordernumber = ", this.orderNumber);
      this.orderService.getOrderByOrderNumber(this.orderNumber).pipe(
        catchError(() => of([]))
      )
      .subscribe((order : any ) => {
        console.log("order detail = ", order);
        this.order = order;
        this.loadingFlag = false;
      });
  });
    

  }

}
