import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  #isLogginIn: boolean = false;
  get isLogginIn() {
    return this.#isLogginIn;
  }
  set isLogginIn(isLogginIn: boolean) {
    this.#isLogginIn = isLogginIn;
  }

  set token(token) {
    localStorage.setItem(environment.token_storage_key, token);
    this.isLogginIn = true;
  }
  get token(): any {
    return localStorage.getItem(environment.token_storage_key);
  }
  get name(): string {
    let name: string = 'unknown';
    if (this.token) {
      name = this._jwtService.decodeToken(this.token).name;
    }
    return name;
  }

  logout(): void {
    localStorage.clear();
  }

  constructor(private _jwtService: JwtHelperService) {}
}
