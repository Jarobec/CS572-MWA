import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {}

  login(form: NgForm): void {
    console.log(form.value);
  }
}
