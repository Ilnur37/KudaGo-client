import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {ProfileComponent} from "./user/profile/profile.component";
import {StandUpComponent} from "./posts/standups/standup/stand-up.component";
import {FilmMainComponent} from "./posts/films/film-main/film-main.component";
import {FilmInfoComponent} from "./posts/films/film-info/film-info.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  {path: 'film/:sorted', component: FilmMainComponent, canActivate: [AuthGuardService]},
  {path: 'film/info/:id', component: FilmInfoComponent, canActivate: [AuthGuardService]},

  /*{
    path: 'film',
    component: FilmMainComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      {path: ':id', component: FilmInfoComponent}
    ]
  },*/

  {path: 'standUp', component: StandUpComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
