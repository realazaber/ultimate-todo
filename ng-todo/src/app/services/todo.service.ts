import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  key: string = 'ng-todos';

  constructor() {}

  createTodo(todo: ITodo): void {
    let todos: ITodo[] = this.getTodos();

    if (todos.length == 0) {
      console.log('0 length');
      todo.id = 1;
      todos.push(todo);
      console.log('< 1 Added ' + todo.title);
      this.saveToStorage(todos);
    } else {
      console.log('more length');
      const newestTodo = todos[todos.length - 1];
      console.log(' newest ' + newestTodo.id + newestTodo.title);
      try {
        console.log('increaes id');
        todo.id = newestTodo.id + 1;
        console.log('big id ' + todo.id);
        todos.push(todo);
        console.log('Added ' + todo.title);
        this.saveToStorage(todos);
      } catch {}
    }
  }

  updateTodo(newTodo: ITodo): void {
    const todos: ITodo[] = this.getTodos();
    let newTodos: ITodo[] = [];

    todos.forEach((todo: ITodo) => {
      if (todo.id == newTodo.id) {
        todo = newTodo;
      }
      newTodos.push(todo);
    });

    this.saveToStorage(newTodos);
  }

  toggleTodoStatus(newTodo: ITodo): void {
    const todos: ITodo[] = this.getTodos();
    let newTodos: ITodo[] = [];

    todos.forEach((todo: ITodo) => {
      if (todo.id == newTodo.id) {
        todo.completed = !todo.completed;
      }
      newTodos.push(todo);
    });
    this.saveToStorage(newTodos);
  }

  deleteTodo(deleteTodo: ITodo): void {
    const todos: ITodo[] = this.getTodos();

    let newTodos: ITodo[] = [];

    todos.forEach((todo: ITodo) => {
      if (todo.id != deleteTodo.id) {
        newTodos.push(todo);
      } else {
        console.log('Not including ' + deleteTodo.title);
      }
    });

    this.saveToStorage(newTodos);
  }

  getTodos(): ITodo[] {
    const tmpTodos = localStorage.getItem(this.key);
    let todos: ITodo[] = [];
    if (tmpTodos) {
      todos = JSON.parse(tmpTodos) as ITodo[];
    }
    if (todos) {
      return todos;
    } else return [];
  }

  private saveToStorage(todos: ITodo[]): void {
    localStorage.setItem(this.key, JSON.stringify(todos));
  }
}
