import { Dispatch, useContext, useEffect, useState } from "react";
import { ITodo } from "../models/todo";
import { TodoContext } from "../App";
import { SetStateAction } from "react";
import {
  deleteTodo,
  getTodos,
  toggleTodoStatus,
  updateTodo,
} from "../services/todoservice";

export default function Todo(props: ITodo | any) {
  const [todos, setTodos] = useContext(TodoContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editBtnText, setEditBtnText] = useState<string>("Edit");
  const [formData, setFormData] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
    completed: false,
  });

  const [todo, setTodo] = useState<ITodo>(
    props.todo || {
      id: 0,
      title: "",
      description: "",
      completed: false,
    }
  );

  function contextDeleteTodo(todo: ITodo): void {
    deleteTodo(todo);
    setTodos(getTodos());
  }

  function contextToggleTodo(todo: ITodo): void {
    toggleTodoStatus(todo);
    todo.completed = !todo.completed;
    setTodo(todo);
    setTodos(getTodos());
  }

  function contextUpdateTodo(todo: ITodo): void {
    updateTodo(todo);
    setTodos(getTodos());
  }

  function toggleEdit(): void {
    setEditMode(!editMode);
    if (editMode) {
      setEditBtnText("Edit");
      contextUpdateTodo(todo);
      updateTodo(todo);
    } else {
      setEditBtnText("Save");
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setTodo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col md:flex-row p-3 rounded-sm border-[1px] border-slate-400 m-3 justify-between">
      <div className="flex flex-col gap-3">
        {editMode ? (
          <form className="flex flex-col">
            <div className="flex flex-row justify-center items-center gap-x-1">
              <span>{todo.id}</span>
              <input
                type="text"
                name="title"
                value={todo.title}
                onChange={handleInputChange}
              />
            </div>
            <textarea
              name="description"
              cols={10}
              rows={1}
              value={todo.description}
              onChange={handleInputChange}
            ></textarea>
          </form>
        ) : (
          <div className="flex flex-col gap-y-2">
            <span>
              {todo.id} {todo.title}
            </span>
            <span> {todo.description}</span>
          </div>
        )}
      </div>
      <div className="flex flex-row md:flex-col justify-between">
        <div>
          <button onClick={() => contextToggleTodo(todo)}>
            {todo.completed ? (
              <div className="w-6 aspect-square rounded-sm border-[1px] border-slate-400 bg-primary flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check-lg text-white"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                </svg>
              </div>
            ) : (
              <div className="w-6 aspect-square rounded-sm border-[1px] border-slate-400"></div>
            )}
          </button>
        </div>
        <div className="flex flex-row gap-x-2 justify-center items-center">
          <button
            onClick={() => toggleEdit()}
            className="text-slate-600 underline"
          >
            {editBtnText}
          </button>
          <button
            onClick={() => contextDeleteTodo(todo)}
            className="mt-auto text-primary font-bold"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
