import { useState } from "react";

/* eslint-disable react/prop-types */
export default function Todo({item, actualizar,eliminar,estado}){
    const [isEdit,setIsEdit]=useState(false);

    
    
    function FormEdit(){
        const [newValue,setNewValue]=useState(item.title);

        function handleSubmit(e){
            e.preventDefault();
        }

        function handlerChange(e){
            const value=e.target.value;
            setNewValue(value);
        }

        function handleClickActualizar(){
            actualizar(item.id,newValue);
            setIsEdit(false);
        }

        return (
            <form className="todoActualizarForm" onSubmit={handleSubmit}>
                <input type="text" 
                className="todoInput"
                value={newValue}
                onChange={handlerChange}
                />
                <input type="submit" value="Actualizar" onClick={handleClickActualizar} />
            </form>
        );
    }



    function TodoElement(){


        return (
            <div>
                {item.completed ? <span>✔</span> : <input type="checkbox" onClick={()=>estado(item.id)}></input>}               
                {item.title}
                <button className="btnEditar" onClick={()=>setIsEdit(true)}>Editar</button>
                <button className="btnEliminar" onClick={()=>eliminar(item.id)}>Eliminar</button>
            </div>
        );
    }

    // eslint-disable-next-line react/prop-types
    return (
        <div className="todo">
            {isEdit ? <FormEdit></FormEdit> : <TodoElement></TodoElement>}
        </div>
    );
}