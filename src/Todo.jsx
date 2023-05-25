function Todo({ todos, onDelete, onCheck }) {
  return (
    <>
      {todos.length === 0 && <div className="noTodo">No todos found</div>}

      <div className="todos">
        {todos.map((todo, index) => (
          <div key={index} className="todo">
            <div className="todo-title">
              <input
                className="todo-checkbox"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => onCheck(e, index)}
              />

              <span>{todo.title}</span>
            </div>
            <button
              onClick={() => onDelete(index)}
              className="button button-delete"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
