import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myRoute: Router) { }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token);
  }

  setName(name: string) {
    localStorage.setItem("name", name);
  }

  getName() {
    return localStorage.getItem("name");
  }

  setUserId(userId: string) {
    localStorage.setItem("userId", userId)
  }

  getUserId() {
    return localStorage.getItem("userId");
  }

  getToken() {
    return localStorage.getItem("LoggedInUser");
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    this.myRoute.navigate(["login"]);
  }
}
