import "./css/taskForm.css";
export const TaskForm = ({title,setTitle,todos,setTodos}) => {

    const handleSubmit=(e)=>{
        e.preventDefault();
        
    const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        completed: false,
      };
  
      setTodos([...todos, newTodo]);
      setTitle("");
    }


  return (
    <form
      className="todoCreateForm"
      onSubmit={handleSubmit}
    >
      <input
        className="todoInput"
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Ej: Ir al supermercado"
        required
      ></input>
      <input
        className="todoButtonCreate"
        type="submit"
        value="Agregar"
      ></input>
    </form>
  );
};
