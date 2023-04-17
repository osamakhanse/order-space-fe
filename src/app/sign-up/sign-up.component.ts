import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private _fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      name: ['', [<any>Validators.required]],
      email: ['', [<any>Validators.required]],
      phone: ['', [<any>Validators.required]],
      address: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]

    });
  }

  submit(model: any)
  {
    console.log("submit called")
    console.log(model);
    this.router.navigate(['/order-space/profile']);

  }

}
