import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../container/container.component';
import { TodoService } from '../../services/todo.service';
import { ITodo } from '../../models/todo';

import { CreateTodoComponent } from '../create-todo/create-todo.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoComponent,
    ContainerComponent,

    CreateTodoComponent,
  ],
  templateUrl: './todo-list.component.html',
  styles: ``,
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  receieveDeletedEmit() {
    this.todos = [];
    this.todos = this.todoService.getTodos();
  }
}
