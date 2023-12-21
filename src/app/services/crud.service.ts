import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  public apiURL:string =' http://localhost:3000/tasks'
  
  constructor(private http: HttpClient) { }

  addtask( task: Task) : Observable<Task>{
    return this.http.post<Task>(this.apiURL, task)
  }

  getAllTasks() : Observable<Task[]>{
    return this.http.get<Task[]>(this.apiURL)
  }

  deletetask( task: Task) : Observable<Task>{
    return this.http.delete<Task>(`${this.apiURL}/${task.id}`)
  }

  edittask( task: Task) : Observable<Task>{
    return this.http.put<Task>(`${this.apiURL}/${task.id}`, task)
  }
}
