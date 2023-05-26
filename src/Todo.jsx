import TodoItem from "./TodoItem";

function Todo({ todos, deleteTodo, checkTodo  }) {
  return (
    <>
      {todos.length === 0 && <div className="noTodo">No todos found</div>}

      <div className="todos">
        {todos.map((todo, index) => (
          <div key={index} className="todo">
            <TodoItem
              todo={todo}
              index={index}
              deleteTodo={deleteTodo}
              checkTodo={checkTodo}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
