import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    console.log('registrationForm', this.registrationForm.value);
  }
}
