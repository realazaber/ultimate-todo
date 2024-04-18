import React, { useContext, useState } from "react";
import { ITodo } from "../models/todo";
import { createTodo, getTodos } from "../services/todoservice";
import { TodoContext } from "../App";

export default function CreateTodo() {
  const [todos, setTodos] = useContext(TodoContext);

  const [formData, setFormData] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
    completed: false,
  });

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitForm() {
    if (formData) {
      if (formData.title != "" && formData.description != "") {
        contextCreateTodo(formData);
        setFormData({
          id: 0,
          title: "",
          description: "",
          completed: false,
        });
      }
    }
  }

  function contextCreateTodo(todo: ITodo): void {
    createTodo(todo);
    setTodos(getTodos());
  }

  return (
    <form className="flex flex-col gap-y-3 w-full sm:w-1/3">
      <h3>Create todo</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        cols={12}
        rows={5}
        placeholder="Description"
        required
        value={formData.description}
        onChange={handleInputChange}
      ></textarea>
      <button
        onClick={() => submitForm()}
        className="text-white bg-primary rounded-sm p-3 mx-auto"
      >
        Add todo
      </button>
    </form>
  );
}
