import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Credientials } from '../classes/crediential-model';
import { UsersDataService } from '../users-data.service';

// 1. Create UI
// 2. DB Schema
// 3. API
// 4. Consume API

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  successMessage!: String;
  errorMessage!: String;
  haveSuccess: boolean = false;
  haveError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _usersService: UsersDataService
  ) {
    this.registrationForm = formBuilder.group({
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
    });
    // new FormGroup({
    //   name: new FormControl(),
    //   username: new FormControl(),
    //   password: new FormControl(),
    //   repeatPassword: new FormControl(),
    // });
  }

  ngOnInit(): void {}

  register(): void {
    const newUser: Credientials = new Credientials();
    newUser.fillFromFormGroup(this.registrationForm);

    this._usersService.register(newUser).subscribe({
      next: (registeredUser) => {
        this.successMessage = 'User created';
        this.haveSuccess = true;
        this.haveError = false;
      },
      error: (err) => {
        this.errorMessage = 'Error creating user';
        this.haveSuccess = false;
        this.haveError = true;
      },
      complete: () => {},
    });
  }
}
