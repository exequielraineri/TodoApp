import { useEffect, useState } from "react";
import TaskItem from "./TaskItem.jsx";
import "./css/taskList.css";
import { TaskForm } from "./TaskForm.jsx";

import swal from "sweetalert";

export default function TaskList() {
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

  

  return (
    <div className="fondo">
      <div className="todoContainer">
        <h4>Lista de tareas</h4>
        <TaskForm
          title={title}
          setTitle={setTitle}
          todos={todos}
          setTodos={setTodos}
        ></TaskForm>
        <p className="totalTareas">
          {completado} de {todos.length} tareas completadas
        </p>
        <div className="todosContainer">
          {todos.map((item) => (
            <TaskItem
              key={item.id}
              item={item}
              actualizar={handlerActualizar}
              eliminar={handleEliminar}
              estado={handleEstado}
            ></TaskItem>
          ))}
        </div>
      </div>
    </div>
  );
}
