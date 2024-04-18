import React, { useContext, useEffect, useState } from "react";
import { ITodo } from "../models/todo";

import Todo from "./Todo"; // Import the Todo component
import { TodoContext } from "../App";

export default function TodoList() {
  const [todos, setTodos] = useContext(TodoContext);

  if (!todos) {
    return <p>Loading todos...</p>;
  }

  return (
    <div className="w-full">
      <h3>Todo list</h3>
      <div className="flex flex-wrap">
        {todos.map((todo: ITodo) => (
          <div className="w-full sm:max-w-[50%] md:max-w-[50%] md:min-w-[33%]">
            <Todo key={todo.id} todo={todo} />
          </div>
        ))}
      </div>
    </div>
  );
}
