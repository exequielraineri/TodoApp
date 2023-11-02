import { useState } from "react";
import Todo from "./todo.jsx";
import "./todoApp.css";

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle("");
  }

  function handlerActualizar(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos(temp);
  }

  function handleEliminar(id) {
    const temp = todos.filter((item) => item.id !== id);
    setTodos(temp);
  }

  function handleEstado(id) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.completed = !item.completed;
    setTodos(temp);
  }

  return (
    <div className="todoContainer">
      <h4>Lista de tareas</h4>
      <form className="todoCreateForm" onSubmit={handleSubmit}>
        <input
          className="todoInput"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Ir al supermercado"
          required
        ></input>
        <input
          className="todoButtonCreate"
          type="submit"
          value="Create tarea"
        ></input>
      </form>
      <p className="totalTareas">Total tareas: {todos.length}</p>
      <div className="todosContainer">
        
            {todos.map((item) => (
              <Todo
                key={item.id}
                item={item}
                actualizar={handlerActualizar}
                eliminar={handleEliminar}
                estado={handleEstado}
              ></Todo>
            ))}
          
       
      </div>
    </div>
  );
}
