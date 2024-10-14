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
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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

  const todosList = todos.filter((todo) => todo.isDone === false);
  const doneList = todos.filter((todo) => todo.isDone === true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/todos", {
      title,
      contents,
      isDone: false,
    });
    setTodos([...todos, res.data]);
    setTitle("");
    setContents("");
  };

  const handleDelete = async (todoId: string) => {
    await axios.delete(`http://localhost:4000/todos/${todoId}`);
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  const handleSwitch = async (todo: Todo) => {
    await axios.patch(`http://localhost:4000/todos/${todoId}`, {
      idDone: !todo.isDone,
    });
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id === todo.id) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return t;
        }
      })
    );
  };

  return (
    <div>
      <h1>Todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h2>해야할 일</h2>
      <ul className="border-2 border-gray-300 rounded-md p-4">
        {todosList.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <p>{todo.isDone ? "완료됨" : "미완료됨"}</p>
            <button
              className="border p-2"
              onClick={() => handleDelete(todo.id)}
            >
              삭제
            </button>
            <button className="border p-2" onClick={() => handleSwitch(todo)}>
              완료
            </button>
          </li>
        ))}
      </ul>

      <h2>완료된 일</h2>
      <ul className="border-2 border-gray-300 rounded-md p-4">
        {doneList.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <p>{todo.isDone ? "완료됨" : "미완료됨"}</p>
            <button
              className="border p-2"
              onClick={() => handleDelete(todo.id)}
            >
              삭제
            </button>
            <button className="border p-2" onClick={() => handleSwitch(todo)}>
              취소
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
