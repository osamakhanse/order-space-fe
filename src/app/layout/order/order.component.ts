import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDetailsService } from '../../shared/order-details-service/order-details.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
}) 
export class OrderComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['rowId', 'orderNumber', 'orderTotal', 'orderStatus'];
  dataSource!:OrderDataSource;

  loadingFlag = true;
  constructor( public router: Router, private route: ActivatedRoute, private orderService: OrderDetailsService) { }

  ngOnInit(): void {
    this.dataSource = new OrderDataSource(this.orderService);
    this.dataSource.loadOrders();
  }
 
  viewDetails(id: string) {
    this.router.navigate(['/order-space/order-details/' + id]);
  }

}


export class OrderDataSource extends DataSource<any> {

  private ordersSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalElements: number = 0;
  public spinner: boolean = true;

  userData : any;
  constructor(private orderService: OrderDetailsService) {

    super();

  }

  connect(): Observable<any[]> {

    return this.ordersSubject.asObservable();
  }

  disconnect() {

    this.ordersSubject.complete();
    this.loadingSubject.complete();
  }

  loadOrders() {

    this.spinner = true;
    this.loadingSubject.next(true);
    let email = localStorage.getItem("user_email");
    this.orderService.getAllOrders(email).pipe(
      catchError(() => of([])),
      finalize(() => { this.loadingSubject.next(false); })
    )
    .subscribe((orders : any ) => {
      console.log(orders);
      this.ordersSubject.next(orders);
      console.log("order subject : ", this.ordersSubject);
      this.totalElements = orders.totalElements;
      this.spinner = false;
      return this.spinner;
    });

  }
}