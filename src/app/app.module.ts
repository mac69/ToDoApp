import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent},
      { path: 'todolist', component: TodoComponent, canActivate: [AuthGuard]}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
