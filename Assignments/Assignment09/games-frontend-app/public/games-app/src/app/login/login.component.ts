import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../authentication.service';
import { Credientials } from '../classes/crediential-model';

import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!: NgForm;

  username: string = 'Jack';
  password: string = '123';

  get isLoggedIn() {
    return this._authenticationService.isLogginIn;
  }
  name: string = '';

  constructor(
    private _usersService: UsersDataService,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  login(): void {
    console.log(this.loginForm.value);
    let credientials: Credientials = new Credientials();
    credientials.fillFromNgForm(this.loginForm);

    this._usersService.login(credientials).subscribe({
      next: (response) => {
        console.log('response', response);

        this._authenticationService.token = response.token;
        this._authenticationService.isLogginIn = true;
        this.name = this._authenticationService.name;
        // this.name = this._jwtService.decodeToken(response.token).name;
      },
      error: (err) => {
        // handle error by displaying on html page
      },
      complete: () => {},
    });
  }

  logout(): void {
    this._authenticationService.isLogginIn = false;
    this._authenticationService.logout();
  }
}
