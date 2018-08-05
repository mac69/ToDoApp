import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoapp';
  private apiUrl: string;
  restItems: any;

  constructor(private http: HttpClient) {
  }

  // ngOnInit() {
  //   this.getToDoList();
  // }

  // getToDoList(): void {
  //   this.restItemsServiceGetRestItems()
  //     .subscribe(
  //       restItems => {
  //         this.restItems = restItems;
  //         console.log(this.restItems);
  //       }
  //     )
  // }

  //  // Rest Items Service: Read all REST Items
  //  restItemsServiceGetRestItems() {
  //   this.apiUrl = "http://localhost/sites/Todo/public/api/tasklist/";
  //   return this.http
  //     .get<any[]>(this.apiUrl)
  //     .pipe(map(data => data));
  // }
}
