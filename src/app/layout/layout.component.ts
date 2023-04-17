import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProfileService } from '../shared/profile-service/profile.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private profileService: ProfileService, private breakpointObserver: BreakpointObserver, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("access_token") == null){
      this.profileService.getLoginUrl().subscribe(response => {
        window.location.href = response.loginUrl;
      })
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  logout() {
    console.log("Logout");
    localStorage.clear();
    this.profileService.getLoginUrl().subscribe(response => {
      window.location.href = response.loginUrl;
    })
 }


}
