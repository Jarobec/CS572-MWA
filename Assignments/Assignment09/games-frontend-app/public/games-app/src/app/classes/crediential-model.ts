import { FormGroup, NgForm } from '@angular/forms';

export class Credientials {
  #name!: String;
  #username!: String;
  #password!: String;

  get username() {
    return this.#username;
  }

  get password() {
    return this.#password;
  }

  get name() {
    return this.#name;
  }

  fillFromFormGroup(form: FormGroup) {
    this.#name = form.value.name;
    this.#username = form.value.username;
    this.#password = form.value.password;
  }

  fillFromNgForm(form: NgForm) {
    this.#name = form.value.name;
    this.#username = form.value.username;
    this.#password = form.value.password;
  }

  json(): any {
    return {
      name: this.#name,
      username: this.#username,
      password: this.#password,
    };
  }
}
