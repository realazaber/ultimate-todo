import { useContext } from "react";
import { ITodo } from "../models/todo";
import { TodoContext } from "../App";
import { getTodos, key } from "../services/todoservice";

export default function DebugCom() {
  const todos: ITodo[] = useContext(TodoContext);

  return (
    <div className="bg-primary gap-3 rounded-sm">
      <button
        className="p-3 rounded-sm m-3 text-white bg-yellow-600"
        onClick={() => console.log(todos)}
      >
        Show Context
      </button>
      <button
        className="p-3 rounded-sm m-3 text-white bg-green-600"
        onClick={() => console.log(getTodos())}
      >
        Show Local Storage
      </button>
      <button
        className="p-3 rounded-sm m-3 text-white bg-red-600"
        onClick={() => {
          localStorage.setItem(key, JSON.stringify([]));
        }}
      >
        Delete all
      </button>
    </div>
  );
}
