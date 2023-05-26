import { useEffect, useRef, useState } from "react";
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
      description,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setTitle("");
    setDescription("");
    titleElement.current.value = "";
    descriptionElement.current.value = "";
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="app">
        <h1>Todo App</h1>
        <label>
          Title
          <input
            className="textField"
            type="text"
            placeholder="Hit the sack."
            onChange={handleTitleChange}
          />
        </label>
        <div className="toolbar">
          <button onClick={addTodo} className="button button-add">
            Add
          </button>
        </div>

        <hr />

        <Todo
          todos={todos}
          onCheck={handleCompletedChange}
          onDelete={handleDelete}
        ></Todo>
      </div>
    </div>
  );
}

export default App;
