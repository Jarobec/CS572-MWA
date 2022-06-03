import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

class Credientials {
  #_username: string;
  #_password: string;
  constructor(username: string, password: string) {
    this.#_username = username;
    this.#_password = password;
  }
  get username() {
    return this.#_username;
  }
  set username(username: string) {
    this.#_username = username;
  }
  get password() {
    return this.#_password;
  }
  set password(password: string) {
    this.#_password = password;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!: NgForm;

  //userCredientials!: Credientials;

  constructor() {
    //this.userCredientials = new Credientials('Jack', '123');
  }

  ngOnInit(): void {
    setTimeout(() => {
      //console.log('SetTimeoutCalled');
      this.loginForm.setValue({ name: 'Jack', password: '123' });
    }, 0);
  }

  login(): void {
    console.log(this.loginForm.value);
    //console.log(this.userCredientials);
  }
}
