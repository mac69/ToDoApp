import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// export class User {
//   name: string;
//   email: string;
//   password: string;
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private apiUrl: string;
  registered: boolean;
  loggedin: boolean;
  form;
  constructor(private http: HttpClient, private auth: AuthService, private myRoute: Router) { }

  ngOnInit() {
  }

  login(user: NgForm) {
    console.log("sod");
    this.apiUrl = "http://localhost/sites/todoold/public/api/auth/login";
    return this.http.post<any[]>(this.apiUrl, {
      email : user.value.loginEmail,
      password : user.value.loginPassword
    }).subscribe(
      data => {
        if (data["result"] == "OK") {
          console.log(user.value.loginEmail);          
          this.loggedin = true;
          this.auth.sendToken(user.value.loginEmail);
          this.auth.setName(data["name"]);
          this.auth.setUserId(data["userId"]);
          // console.log(data["name"]);
          // console.log(data["userId"]);
          this.myRoute.navigate(["todolist"]);
        } else {
          this.loggedin = false;
          console.log(this.loggedin);
        }
      },
      error => {
        this.loggedin = false;
        console.log("Error", error);
      }
    );
  }

  register(user: NgForm) {
    console.log(user.value.regName);
    console.log(user.value.regEmail);
    console.log(user.value.regPass);
    this.apiUrl = "http://localhost/sites/todoold/public/api/auth/register";
    return this.http.post<any[]>(this.apiUrl, {
      name : user.value.regName,
      email : user.value.regEmail,
      password : user.value.regPass
    }).subscribe(
      data => {
        this.registered = true;
        console.log("POST Request is successful ", data);
      },
      error => {
        this.registered = false;
        console.log("Error", error);
      }
    );
  }
}
