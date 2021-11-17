import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupCreadorComponent } from './components/signup-creador/signup-creador.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FeedComponent } from './components/feed/feed.component';
import { BackOfficeComponent } from './components/backOffice/back-office/back-office.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'creator-Profile/:nickname',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'creador-Register',          component: SignupCreadorComponent },
    { path: 'logout',          component: LogoutComponent },
    { path: 'feed',          component: FeedComponent },
    { path: 'backOffice',          component: BackOfficeComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
