import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/profile-service/profile.service';
import { User } from '../../shared/models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userForm!:FormGroup;

  user !:any;
  editMode = false;
  loadingFlag = true;
  saving = false;

  constructor(private profileService: ProfileService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.loadingFlag = true;
    let email = localStorage.getItem("user_email");
    this.profileService.getUserByEmail(email).subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.loadingFlag = false;
      localStorage.setItem("user_details", JSON.stringify(user));
      console.log(localStorage.getItem('user_details'));
    });
  }
  save() {
    this.saving = true;
    // Call the user service to update the user's information in the database
    this.profileService.updateUser(this.user.userName, this.user.userAddress, this.user.userPhoneNumber, this.user.name, this.user.userCountry).subscribe(response => {
      console.log("response : ", response);
      this.getUser();
      this.editMode = false;
      this.saving = false;
    });
  }

  cancel() {
    // Discard any changes and revert back to the read-only mode
    this.profileService.getUserByEmail('osamakhan.se@gmail.com').subscribe(user => {
      this.user = user;
    });
    this.editMode = false;
  }

}
