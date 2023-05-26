import TodoItem from "./TodoItem";

function Todo({ todos, deleteTodo }) {
  return (
    <>
      {todos.length === 0 && (
        <div className="text-center text-gray-500">No todos found</div>
      )}

      <div className="space-y-2">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="flex justify-between items-center border shadow rounded p-2"
          >
            <TodoItem
              todo={todo}
              index={index}
              deleteTodo={deleteTodo}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
