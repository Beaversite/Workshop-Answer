import { useEffect, useState } from "react";
import Todo from "./Todo.jsx";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [title, setTitle] = useState("");


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCompletedChange = (e, index) => {
    const newTodos = [...todos];
    newTodos[index].completed = e.target.checked;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const addTodo = () => {
    const newTodo = {
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setTitle("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-96 space-y-2">
        <h1 className="text-3xl">Todo App</h1>
        <label>
          Title
          <input
            className="border shadow rounded w-full p-1"
            type="text"
            placeholder="Hit the sack."
            onChange={handleTitleChange}
            value={title}
          />
        </label>
        <div className="flex justify-end">
          <button
            onClick={addTodo}
            className="p-2 rounded bg-green-500 hover:bg-green-400 active:bg-green-500 active:scale-95 text-white transition"
          >
            Add
          </button>
        </div>

        <hr />

        <Todo
          todos={todos}
          checkTodo={handleCompletedChange}
          deleteTodo={handleDelete}
        ></Todo>
      </div>
    </div>
  );
}

export default App;
