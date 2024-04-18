import { ITodo } from "../models/todo";

const key: string = "react-todos";

function createTodo(todo: ITodo): void {
  let todos: ITodo[] = getTodos();

  if (todos.length == 0) {
    todo.id = 1;
    todos.push(todo);

    saveToStorage(todos);
  } else {
    const newestTodo = todos[todos.length - 1];

    try {
      todo.id = newestTodo.id + 1;
      todos.push(todo);

      saveToStorage(todos);
    } catch {}
  }
}

function updateTodo(newTodo: ITodo): void {
  const todos: ITodo[] = getTodos();
  let newTodos: ITodo[] = [];

  todos.forEach((todo: ITodo) => {
    if (todo.id == newTodo.id) {
      todo = newTodo;
    }
    newTodos.push(todo);
  });

  saveToStorage(newTodos);
}

function toggleTodoStatus(newTodo: ITodo): void {
  const todos: ITodo[] = getTodos();
  let newTodos: ITodo[] = [];

  todos.forEach((todo: ITodo) => {
    if (todo.id == newTodo.id) {
      todo.completed = !todo.completed;
    }
    newTodos.push(todo);
  });
  saveToStorage(newTodos);
}

function deleteTodo(deleteTodo: ITodo): void {
  const todos: ITodo[] = getTodos();

  let newTodos: ITodo[] = [];

  todos.forEach((todo: ITodo) => {
    if (todo.id != deleteTodo.id) {
      newTodos.push(todo);
    } else {
    }
  });

  saveToStorage(newTodos);
}

function getTodos(): ITodo[] {
  const tmpTodos = localStorage.getItem(key);
  let todos: ITodo[] = [];
  if (tmpTodos) {
    todos = JSON.parse(tmpTodos) as ITodo[];
  }
  if (todos) {
    return todos;
  } else return [];
}

function saveToStorage(todos: ITodo[]): void {
  localStorage.setItem(key, JSON.stringify(todos));
}

export { createTodo, updateTodo, deleteTodo, toggleTodoStatus, getTodos, key };
