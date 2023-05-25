function Todo({ todos, onDelete, onCheck }) {
  return (
    <>
      {todos.length === 0 && <div className="text-center text-gray-500">No todos found</div>}

      <div className="space-y-2">
        {todos.map((todo, index) => (
          <div key={index} className="flex justify-between items-center border shadow rounded p-2">
            <div className="flex items-center gap-2">
              <input
                className="w-6 h-6"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => onCheck(e, index)}
              />

              <span>{todo.title}</span>
            </div>
            <button
              onClick={() => onDelete(index)}
              className="p-2 rounded bg-red-500 hover:bg-red-400 active:bg-red-500 active:scale-95 text-white transition"
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
