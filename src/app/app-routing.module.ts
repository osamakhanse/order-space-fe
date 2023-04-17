import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LayoutModule } from './layout/layout.module';
import { PostLoginComponent } from './post-login/post-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/order-space/profile', pathMatch: 'full'},
  { path: 'signup', component: SignUpComponent },
  { path: 'order-space', loadChildren: () => LayoutModule},
  { path: 'post-login', component: PostLoginComponent, pathMatch: 'full', data: {token: ''}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
