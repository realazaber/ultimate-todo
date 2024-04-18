import React, { useEffect, useState } from "react";
import Container from "./components/container";
import CreateTodo from "./components/CreateTodo";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import { ITodo } from "./models/todo";
import { getTodos } from "./services/todoservice";

export const TodoContext = React.createContext<any>(getTodos());

export default function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  return (
    <div>
      <Nav />

      <Container>
        <TodoContext.Provider value={[todos, setTodos]}>
          <div className="my-12 flex flex-col sm:flex-row gap-y-3 sm:gap-x-3">
            <CreateTodo />
            <TodoList />
          </div>
        </TodoContext.Provider>
      </Container>

      <Footer />
    </div>
  );
}
