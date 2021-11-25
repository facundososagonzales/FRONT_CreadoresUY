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
import { SearchComponent } from './components/search/search.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { UserEditComponent } from './components/backOffice/user-edit/user-edit.component';
import { TextComponent } from './components/create-post/text/text.component';
import { ImageComponent } from './components/create-post//image/image.component';
import { VideoComponent } from './components/create-post//video/video.component';
import { LinkComponent } from './components/create-post//link/link.component';
import { SuscribeComponent } from './components/suscribe/suscribe.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'creator-Profile/:nickname',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'creador-Register',          component: SignupCreadorComponent },
    { path: 'logout',          component: LogoutComponent },
    { path: 'feed',          component: FeedComponent },
    { path: 'backOffice',          component: BackOfficeComponent},
    { path: 'search/:querry',          component: SearchComponent},
    { path: 'createPost',          component: CreatePostComponent},
    { path: 'backOffice/user-edit/:idUser',          component: UserEditComponent},
    { path: 'createPost/text',          component: TextComponent},
    { path: 'createPost/image',          component: ImageComponent},
    { path: 'createPost/video',          component: VideoComponent},
    { path: 'createPost/link',          component: LinkComponent },
    { path: 'suscribe',                 component: SuscribeComponent },
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
