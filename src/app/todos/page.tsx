"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // const fetchTodos = async () => {
    //   const res = await fetch("http://localhost:3000/api/todos");
    //   const data = await res.json();
    //   console.log(data);
    // };

    // axios
    const fetchTodos = async () => {
      const res = await axios.get("http://localhost:4000/todos");
      setTodos(res.data);
    };

    fetchTodos();
  }, []);

  const todoList = todos.filter((todo) => todo.isDone === false);
  const doneList = todos.filter((todo) => todo.isDone === false);

  return (
    <div>
      <h1>Todos</h1>

      <h2>해야할 일</h2>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <p>{todo.isDone ? "완료됨" : "미완료됨"}</p>
          </li>
        ))}
      </ul>

      <h2>완료된 일</h2>
      <ul>
        {doneList.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <p>{todo.isDone ? "완료됨" : "미완료됨"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
