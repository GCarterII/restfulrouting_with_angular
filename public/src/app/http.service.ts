import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  
  getTasks() {
    return this._http.get('/tasks');
  }
  getTask(id:string){
    return this._http.get('/tasks/'+id)
  }
  constructor(private _http: HttpClient) {
    // this.getTasks();
    // this.getTask("5d275624ed829d15ac255b89");
   }
}
