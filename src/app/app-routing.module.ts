import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {ProfileComponent} from "./user/profile/profile.component";
import {StandUpMainComponent} from "./posts/standups/standup-main/stand-up-main.component";
import {FilmMainComponent} from "./posts/films/film-main/film-main.component";
import {FilmInfoComponent} from "./posts/films/film-info/film-info.component";
import {StandUpInfoComponent} from "./posts/standups/standup-info/stand-up-info.component";
import {ConcertMainComponent} from "./posts/concerts/concert-main/concert-main.component";
import {ConcertInfoComponent} from "./posts/concerts/concert-info/concert-info.component";
import {TopMainComponent} from "./posts/top/top-main/top-main.component";
import {TopInfoComponent} from "./posts/top/top-info/top-info.component";
import {TheaterMainComponent} from "./posts/theaters/theater-main/theater-main.component";
import {TheaterInfoComponent} from "./posts/theaters/theater-info/theater-info.component";
import {KaverMainComponent} from "./posts/kaver/kaver-main/kaver-main.component";
import {KaverInfoComponent} from "./posts/kaver/kaver-info/kaver-info.component";
import {TagMainComponent} from "./posts/tag/tag-main/tag-main.component";
import {TagInfoComponent} from "./posts/tag/tag-info/tag-info.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: TopMainComponent, canActivate: [AuthGuardService]},
  {path: 'top/info/:id', component: TopInfoComponent, canActivate: [AuthGuardService]},

  {path: 'film/:sortLike/:sortGenre', component: FilmMainComponent, canActivate: [AuthGuardService]},
  {path: 'film/:id', component: FilmInfoComponent, canActivate: [AuthGuardService]},

  /*{
    path: 'film',
    component: FilmMainComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      {path: ':id', component: FilmInfoComponent}
    ]
  },*/

  {path: 'standUp/:sorted', component: StandUpMainComponent, canActivate: [AuthGuardService]},
  {path: 'standUp/info/:id', component: StandUpInfoComponent, canActivate: [AuthGuardService]},

  {path: 'concert/:sortLike/:sortGenre', component: ConcertMainComponent, canActivate: [AuthGuardService]},
  {path: 'concert/:id', component: ConcertInfoComponent, canActivate: [AuthGuardService]},

  {path: 'theater/:sorted', component: TheaterMainComponent, canActivate: [AuthGuardService]},
  {path: 'theater/info/:id', component: TheaterInfoComponent, canActivate: [AuthGuardService]},

  {path: 'kaver/:genre/:sorted', component: KaverMainComponent, canActivate: [AuthGuardService]},
  {path: 'kaver-info/info/:id', component: KaverInfoComponent, canActivate: [AuthGuardService]},

  {path: 'tag/:genre/:sorted', component: TagMainComponent, canActivate: [AuthGuardService]},
  {path: 'tag-info/info/:id', component: TagInfoComponent, canActivate: [AuthGuardService]},

  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
