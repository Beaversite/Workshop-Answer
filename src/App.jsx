import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

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
              value={title}
            />
          </label>
        <div className="toolbar">
          <button
            onClick={addTodo}
            className="button button-add"
          >
            Add
          </button>
        </div>

        <hr />

        {todos.length === 0 && (
          <div className="noTodo">No todos found</div>
        )}

        <div className="todos">
          {todos.map((todo, index) => (
            <div
              key={index}
              className="todo"
            >
              <div className="todo-title">
                <input
                  className="todo-checkbox"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => handleCompletedChange(e, index)}
                />

                <span className={todo.completed ? 'checked' : ''}>{todo.title}</span>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="button button-delete"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
