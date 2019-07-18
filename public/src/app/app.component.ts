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
  singleTask = {
    title: '',
    description: '',
    completed: ''
  }
  editTask: boolean = false;
  clicked = '';
  newTask = {
    title: '',
    description: '',
  }
  errTask = {
    title: '',
    description: '',
  }
  errDel = {
    id: '',
    message: ''
  }
  showAll: boolean = false;
  constructor(private _httpService : HttpService) {
    // this.getTask();
    // this.getTasks(); 
  }
  createTask(task){
    let tempObservable = this._httpService.newTask(task);
    tempObservable.subscribe(data => {
      console.log("Sent in new task");
      console.log(data);
      this.errTask = {
        title: '',
        description: '',
      }
      if(data['message'] == "Error"){
        if(data['error']['errors']['description']){
          this.errTask['description'] = data['error']['errors']['description']['message']
        }
        if(data['error']['errors']['title']){
          this.errTask['title'] = data['error']['errors']['title']['message']
        }
      }
      else if(this.showAll){this.getTasks()}
    })
  }
  getTask(id){
    let tempObservable = this._httpService.getTask(id);
    tempObservable.subscribe(data => {
      console.log("Got the 1 task:", data);
      console.log(data);
      this.singleTask = data['data'][0];
    });
  }
  getTasksButt(){
    this.getTasks();
    this.showAll=true
  }
  hideTasksButt(){
    this.tasks = [];
    this.showAll=false
  }
  getTasks(){
    let tempObservable = this._httpService.getTasks();
    tempObservable.subscribe(data => {console.log("Got the tasks:", data);
      this.tasks = data['data'];
      // this.showAll = true;
      console.log(`lalalalala ${this.tasks}`)
    });
  }
  updatedTask(){
    let tempObservable = this._httpService.updateTask(this.singleTask);
    tempObservable.subscribe(data =>{
      console.log("updated!")
      console.log(data)
    })
  }
  deleteTask(id){
    console.log(this.showAll)
    let tempObservable = this._httpService.deleteTask(id);
    tempObservable.subscribe( data => {
      if(data['message'] == "Error"){
        this.errDel['id'] = id;
        this.errDel['message'] = data['error']['errors']['description']['message']
      }
      else if(this.showAll){
        console.log("teststasedtasndfionasdf")
        this.getTasks()}
    })
  }
  // onButtonClick(): void { 
  //   console.log(`Click event is working`);
  //   this.clicked = 'OUCH! YOU DONE CLICKED ME!';
  // }
  // onButtonClickParam(num: Number): void { 
  //   console.log(`Click event is working with num param: ${num}`);
  //   this.clicked = num.toString()
  // }
  // onButtonClickParams(num: Number, str: String): void { 
  //   console.log(`Click event is working with num param: ${num} and str param: ${str}`);
  // }
  // onButtonClickEvent(event: any): void { 
  //   console.log(`Click event is working with event: ${event}`);
  //   console.log(event);
  // }
}
