import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styles: ``,
})
export class TodoComponent {
  @Input() todo: ITodo = {
    id: 0,
    title: '',
    description: '',
    completed: false,
  };
  editMode: boolean = false;
  editBtnText: string = 'Edit';
  @Output() deletedEmit = new EventEmitter<void>();

  constructor(private todoService: TodoService) {}

  toggleEdit(): void {
    this.editMode = !this.editMode;

    if (this.editMode == false) {
      this.editBtnText = 'Edit';
      this.editTodo(this.todo);
    } else {
      this.editBtnText = 'Save';
    }
  }

  toggleComplete(): void {
    this.todoService.toggleTodoStatus(this.todo);
    this.todo.completed = !this.todo.completed;
  }

  editTodo(todo: ITodo): void {
    this.todoService.updateTodo(todo);
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo);
    this.deletedEmit.emit();
  }
}
