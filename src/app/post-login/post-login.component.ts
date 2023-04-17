import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt from 'jsonwebtoken';
import decode from 'jwt-decode';
import { Router } from '@angular/router';




@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.css']
})
export class PostLoginComponent implements OnInit {

  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let token = this.route.snapshot.queryParamMap.get('access_token');
    console.log(token);
    const url = window.location.href;
    const params = new URLSearchParams(url.split('#')[1]);
    let accessToken : any = params.get('access_token');
    localStorage.setItem("access_token", accessToken);
    console.log('Access Token:', accessToken);
    if(accessToken) {
      let decodedToken: any  = decode(accessToken);
      console.log("email = ", decodedToken.username);
      localStorage.setItem("user_email", decodedToken.username);
      this.router.navigate(['/order-space/profile']);
    }
    
  }

  parseJwtAndReadEmail(jwtToken: string) {
    // try {
    //   const decodedToken = jwt.decode(jwtToken)  as { email: string };
    //   if(decodedToken) {
    //     const email = decodedToken.email; // Extract the 'email' field from the decoded token
    //     console.log('Email:', email);
    //     localStorage.setItem("auth-token", jwtToken);
    //     localStorage.setItem("user-email", email);
    //   } // Decode the JWT token
    //    // Log the email to the console or use it in your logic
    // } catch (error) {
    //   console.error('Failed to parse JWT:', error); // Handle any error that may occur during JWT parsing
    // }
  }

}
