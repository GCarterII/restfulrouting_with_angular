import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Greg's app";
  tasks = [];
  constructor(private _httpService : HttpService) {
    this.getTask();
    // this.getTasks(); 
  }
  getTask(){
    let tempObservable = this._httpService.getTask("5d275624ed829d15ac255b89");
    tempObservable.subscribe(data => {console.log("Got the 1 task:", data)});
  }
  getTasks(){
    let tempObservable = this._httpService.getTasks();
    tempObservable.subscribe(data => {console.log("Got the tasks:", data);
    this.tasks = data['data'];
    console.log(`lalalalala ${this.tasks}`)
  });
  }
}
