import "./css/taskItem.css";
import { useState } from "react";
/* eslint-disable react/prop-types */
export default function TaskItem({ item, actualizar, eliminar, estado }) {
  const [isEdit, setIsEdit] = useState(false);

  function FormEdit() {
    const [newValue, setNewValue] = useState(item.title);

    function handleSubmit(e) {
      e.preventDefault();
    }

    function handlerChange(e) {
      const value = e.target.value;
      setNewValue(value);
    }

    function handleClickActualizar() {
      actualizar(item.id, newValue);
      setIsEdit(false);
    }

    return (
      <>
        <cite
          className={
            item.completed ? "estado-task listo" : "estado-task pendiente"
          }
        >
          {item.completed ? "Completado" : "Pendiente"}
        </cite>
        <form
          className="todoActualizarForm"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="todoInput"
            value={newValue}
            onChange={handlerChange}
          />
          <input
            type="submit"
            value="Actualizar"
            className="btn btnActualizar"
            onClick={handleClickActualizar}
          />
        </form>
      </>
    );
  }

  function TodoElement() {
    return (
      <>
        <cite
          className={
            item.completed ? "estado-task listo" : "estado-task pendiente"
          }
        >
          {item.completed ? "Completado" : "Pendiente"}
        </cite>
        <div className="todo-item">
          {item.completed ? (
            <div className="completado">
              <span>✔</span>
            </div>
          ) : (
            <div className="incompleto">
              <input
                type="checkbox"
                onClick={() => estado(item.id)}
              ></input>
            </div>
          )}

          <h5>{item.title}</h5>

          <button
            className="btn btnEditar"
            onClick={() => setIsEdit(true)}
          >
            Editar
          </button>
          <button
            className="btn btnEliminar"
            onClick={() => eliminar(item.id)}
          >
            Eliminar
          </button>
        </div>
      </>
    );
  }

  // eslint-disable-next-line react/prop-types
  return (
    <div className="todo">
      {isEdit ? <FormEdit></FormEdit> : <TodoElement></TodoElement>}
    </div>
  );
}
