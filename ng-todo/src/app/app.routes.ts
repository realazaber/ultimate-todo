import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TodoListComponent,
  },
];
