function TodoItem({todo, index, deleteTodo, checkTodo}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <input
          className="w-6 h-6"
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => checkTodo(e, index)}
        />
        <span className={todo.completed ? "line-through" : ""}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(index)}
        className="p-2 rounded bg-red-500 hover:bg-red-400 active:bg-red-500 active:scale-95 text-white transition"
      >
        Delete
      </button>
    </>
  );
}

export default TodoItem;
