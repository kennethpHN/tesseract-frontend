import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";
import { useEffect } from "react";
import { getToDos, patchToDo } from "../util/api";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getToDos().then((remoteTodos)=> {
      setTodos(remoteTodos);
    });
  }, []);

  const addTodo = (todo) =>  {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo];

    //Codigo agregado para conectar a la api
    axios.post("http://localhost:3000/to-dos", {
      ...todo,
      title: todo.text,
    }).then(()=>{
      getToDos().then((remoteTodos)=> {
        setTodos(remoteTodos);
      });
    });

    //
    setTodos(newTodos);
    console.log(...todos);
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    patchToDo(todoId,newValue).then(()=>{
      setTodos();
      getToDos().then((remoteTodos)=> {
        setTodos(remoteTodos);
      });
    });

  };

  const removeTodo = (id) => {
    axios.delete(`http://localhost:3000/to-dos/${id}`).then(()=>{
      getToDos().then((remoteTodos)=> {
        setTodos(remoteTodos);
      });
    });
  };

  const completeTodo = (id) => {
    todos.map((todo) => {
      if (todo.id === id) {
        patchToDo(id,{...todo, isDone: !todo.isComplete}).then(()=>{
          setTodos();
          getToDos().then((remoteTodos)=> {
            setTodos(remoteTodos);
          });
        });
      }
    });
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
