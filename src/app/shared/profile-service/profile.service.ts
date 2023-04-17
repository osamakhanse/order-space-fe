import { Injectable } from '@angular/core';
import { Observable, of, throwError  } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http :HttpClient) { }



  getAllOrders(){
    let data = {
      "action": "get_orders_by_user",
      "userName": "osamakhan.se@gmail.com"
  }
    return this.http.post<any>('https://bc096ti86i.execute-api.us-east-1.amazonaws.com/Prod/user', data);
  }

  getUserByEmail(email: any) {
    let data = {
      "action":"get_user_detail",
      "user_data": {
          "userName":email
        }
    }
    return this.http.post<any>('https://bc096ti86i.execute-api.us-east-1.amazonaws.com/Prod/user', data);
 
  }  

  updateUser(username: any, userAddress: any, userPhoneNumber: any, name: any, userCountry: any) {
    let data = {
      "action":"edit_user_detail",
      "user_data": {
          "userName": username,
          "userAddress": userAddress,
          "userPhoneNumber": userPhoneNumber,
          "name": name,
          "userCountry": userCountry
        }
    }
    console.log(data);
    return this.http.post<any>('https://bc096ti86i.execute-api.us-east-1.amazonaws.com/Prod/user', data);
  }

  getLoginUrl() {
    return this.http.get<any>('https://mv80qj9m0k.execute-api.us-east-1.amazonaws.com/Prod/getLoginUrl')
  }
}
