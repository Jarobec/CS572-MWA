import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GamesComponent } from './games/games.component';
import { StarsRatingComponent } from './stars-rating/stars-rating.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { GameAddComponent } from './game-add/game-add.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameAddEditComponent } from './game-add-edit/game-add-edit.component';
import { PagingComponent } from './paging/paging.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    GamesComponent,
    StarsRatingComponent,
    RegisterComponent,
    LoginComponent,
    GameComponent,
    GameAddComponent,
    GameEditComponent,
    GameAddEditComponent,
    PagingComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: 'games',
        component: GamesComponent,
      },
      {
        path: 'game/view/:gameId',
        component: GameComponent,
      },
      {
        path: 'game/add',
        component: GameAddEditComponent,
      },
      {
        path: 'game/edit/:gameId',
        component: GameAddEditComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ]),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
