import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private crudService: CrudService) {}
  task: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  ngOnInit() {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.task = new Task();
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(
      (res) => {
        console.log(res)
        this.taskArr  = res
      },
      (err) => {
        console.log(err)
        alert("unable to get tasks")
      }
    );
  }

  addTask() {
    this.task.taskName = this.addTaskValue
    this.crudService.addtask(this.task).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = ''
      },
      (err) => {
        alert("unable to add task")
      }
    );
  }

  editTask() {
    this.task.taskName = this.editTaskValue
    this.crudService.edittask(this.task).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert("failed to update task")
      }
    );
  }

  deleteTask(atask :Task) {
    this.crudService.deletetask(atask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert("unable to delete task")
      }
    );
  }

  call(atask : Task) {
    this.task = atask;
    this.editTaskValue = atask.taskName
  }
}
