import { useEffect, useState } from "react";
import Todo from "./todo.jsx";
import "./todoApp.css";

import swal from "sweetalert";

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState(() => {
    try {
      const todosLocalStorage = localStorage.getItem("todos");
      return todosLocalStorage ? JSON.parse(todosLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [completado, setCompletado] = useState(()=>{
    const completadosCount = todos.reduce((count, item) => {
      if (item.completed) {
        return count + 1;
      }
      return count;
    }, 0);
  
    return completadosCount;
  });

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

    const item = todos.find((item) => item.id === id);
    if (item.completed) {
      setCompletado(completado - 1);
    }
    setTodos(temp);
  }

  function handleEstado(id) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.completed = !item.completed;
    if (item.completed) {
      setCompletado(completado + 1);

      swal({
        title: `Tarea completada: "${item.title}"`,
        timer: 2000,
        icon: "success",
      });
    }
    setTodos(temp);
  }

  function handlerChange(e) {
    setTitle(e.target.value);
  }

  return (
    <div className="todoContainer">
      <h4>Lista de tareas</h4>
      <form className="todoCreateForm" onSubmit={handleSubmit}>
        <input
          className="todoInput"
          type="text"
          value={title}
          onChange={handlerChange}
          placeholder="Ej: Ir al supermercado"
          required
        ></input>
        <input
          className="todoButtonCreate"
          type="submit"
          value="Agregar"
        ></input>
      </form>
      <p className="totalTareas">
        {completado} de {todos.length} tareas completadas
      </p>
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
