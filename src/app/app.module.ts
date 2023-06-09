import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./helper/error-interceptor.service";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { IndexComponent } from './layout/index/index.component';
import { ProfileComponent } from './user/profile/profile.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { StandUpMainComponent } from './posts/standups/standup-main/stand-up-main.component';
import { FilmMainComponent } from './posts/films/film-main/film-main.component';
import { FilmEditComponent } from './posts/admin/film-edit/film-edit.component';
import { FilmInfoComponent } from './posts/films/film-info/film-info.component';
import {MatSelectModule} from "@angular/material/select";
import { FilterPipe } from './pipes/filter.pipe';
import { StandUpInfoComponent } from './posts/standups/standup-info/stand-up-info.component';
import { StandUpEditComponent } from './posts/admin/stand-up-edit/stand-up-edit.component';
import { ConcertMainComponent } from './posts/concerts/concert-main/concert-main.component';
import { ConcertInfoComponent } from './posts/concerts/concert-info/concert-info.component';
import { ConcertEditComponent } from './posts/admin/concert-edit/concert-edit.component';
import { TopMainComponent } from './posts/top/top-main/top-main.component';
import { TopInfoComponent } from './posts/top/top-info/top-info.component';
import { TopEditComponent } from './posts/admin/top-edit/top-edit.component';
import { TheaterMainComponent } from './posts/theaters/theater-main/theater-main.component';
import { TheaterInfoComponent } from './posts/theaters/theater-info/theater-info.component';
import { TheaterEditComponent } from './posts/admin/theater-edit/theater-edit.component';
import { KaverMainComponent } from './posts/kaver/kaver-main/kaver-main.component';
import { KaverInfoComponent } from './posts/kaver/kaver-info/kaver-info.component';
import { KaverEditComponent } from './posts/admin/kaver-edit/kaver-edit.component';
import { TagMainComponent } from './posts/tag/tag-main/tag-main.component';
import { TagInfoComponent } from './posts/tag/tag-info/tag-info.component';
import { TagEditComponent } from './posts/admin/tag-edit/tag-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    ProfileComponent,
    EditUserComponent,
    StandUpMainComponent,
    FilmMainComponent,
    FilmEditComponent,
    FilmInfoComponent,
    FilterPipe,
    StandUpInfoComponent,
    StandUpEditComponent,
    ConcertMainComponent,
    ConcertInfoComponent,
    ConcertEditComponent,
    TopMainComponent,
    TopInfoComponent,
    TopEditComponent,
    TheaterMainComponent,
    TheaterInfoComponent,
    TheaterEditComponent,
    KaverMainComponent,
    KaverInfoComponent,
    KaverEditComponent,
    TagMainComponent,
    TagInfoComponent,
    TagEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [
    authInterceptorProviders,
    authErrorInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
