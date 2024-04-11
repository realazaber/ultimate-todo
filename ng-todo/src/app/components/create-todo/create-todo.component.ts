import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITodo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-todo.component.html',
  styles: ``,
})
export class CreateTodoComponent {
  @Output() createdEmit = new EventEmitter<void>();

  newTodo: ITodo = {
    id: 0,
    title: '',
    description: '',
    completed: false,
  };

  constructor(private todoService: TodoService) {}

  createTodo(): void {
    if (this.newTodo != null) {
      console.log('NOT NULL');
      if (this.newTodo.title != '' && this.newTodo.description != '') {
        this.todoService.createTodo(this.newTodo);
        this.newTodo.id = 0;
        this.newTodo.title = '';
        this.newTodo.description = '';
        this.createdEmit.emit();
      } else {
        alert('Please fill in all fields');
      }
    }
  }
}
