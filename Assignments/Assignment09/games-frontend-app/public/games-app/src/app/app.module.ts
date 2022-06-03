import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        path: 'games/:gameId',
        component: GameComponent,
      },
      {
        path: 'game/add',
        component: GameAddComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
