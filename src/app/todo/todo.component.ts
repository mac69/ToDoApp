import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  private apiUrl: string;
  restItems: any;
  closeResult: string;
  taskId: string;
  taskName: string;
  userName: string;
  userId: any;
  constructor(private toDoService: TodoService, private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    this.userName = this.auth.getName();
    this.userId = this.auth.getUserId();
    this.getToDoList();
  }

  getToDoList(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      ) 
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    // this.apiUrl = "http://localhost/sites/todoold/public/api/tasklist";
    // return this.http
    //   .get<any[]>(this.apiUrl)
    //   .pipe(map(data => data));
    this.apiUrl = "http://localhost/sites/todoold/public/api/tasklist";
    return this.http
      .post<any[]>(this.apiUrl,{
        UserId : this.userId,
      })
      .pipe(map(data => data));
  }

  addTask(itemTitle) {
    this.apiUrl = "http://localhost/sites/todoold/public/api/tasklist/create";
    return this.http.post<any[]>(this.apiUrl, {
      TaskName : itemTitle.value,
      TaskStatus : 0,
      UserId : this.userId,

    }).subscribe(
      data => {
        this.getToDoList();
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  deleteTask(TaskId) {
    this.apiUrl = "http://localhost/sites/todoold/public/api/tasklist/delete";
    return this.http.post<any[]>(this.apiUrl, {
      TaskId : TaskId
    }).subscribe(
      data => {
        this.getToDoList();
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  setToPending(TaskId) {
    this.apiUrl = "http://localhost/sites/todoold/public/api/tasklist/updatestatus";
    return this.http.post<any[]>(this.apiUrl, {
      TaskId : TaskId,
      TaskStatus: 0
    }).subscribe(
      data => {
        this.getToDoList();
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  setToDone(TaskId) {
    this.apiUrl = "http://localhost/sites/todoold/public/api/tasklist/updatestatus";
    return this.http.post<any[]>(this.apiUrl, {
      TaskId : TaskId,
      TaskStatus: 1
    }).subscribe(
      data => {
        this.getToDoList();
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  editTask(TaskId, TaskName) {
    this.taskId = TaskId;
    this.taskName = TaskName;
  }

  updateTask(taskName) {
    console.log(this.taskId + ' ' + taskName.value);
    this.apiUrl = "http://localhost/sites/todoold/public/api/tasklist/updatename";
    return this.http.post<any[]>(this.apiUrl, {
      TaskId : this.taskId,
      TaskName: taskName.value
    }).subscribe(
      data => {
        this.getToDoList();
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

}
