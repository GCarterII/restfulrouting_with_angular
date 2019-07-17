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
  singleTask = {};
  clicked = '';
  constructor(private _httpService : HttpService) {
    // this.getTask();
    // this.getTasks(); 
  }
  getTask(id){
    let tempObservable = this._httpService.getTask(id);
    tempObservable.subscribe(data => {
      console.log("Got the 1 task:", data);
      console.log(data);
      this.singleTask = data;
    });
  }
  getTasks(){
    let tempObservable = this._httpService.getTasks();
    tempObservable.subscribe(data => {console.log("Got the tasks:", data);
    this.tasks = data['data'];
    console.log(`lalalalala ${this.tasks}`)
  });
  }
  onButtonClick(): void { 
    console.log(`Click event is working`);
    this.clicked = 'OUCH! YOU DONE CLICKED ME!';
  }
  onButtonClickParam(num: Number): void { 
    console.log(`Click event is working with num param: ${num}`);
    this.clicked = num.toString()
  }
  onButtonClickParams(num: Number, str: String): void { 
    console.log(`Click event is working with num param: ${num} and str param: ${str}`);
  }
  onButtonClickEvent(event: any): void { 
    console.log(`Click event is working with event: ${event}`);
    console.log(event);
  }
}
