import { Link } from "react-router-dom";

function Todo({ todos, onDelete, onCheck }) {

  const isEmpty = () => {
    if (todos.length === 0) {      
      return (
        <div className="text-center text-gray-500">No todos found</div>
      )
    }
  }

  return (
    <>
      {isEmpty()}

      <div className="space-y-2">
        {todos.map((todo, index) => (
          <div key={index} className="flex justify-between items-center border shadow rounded p-2">
              <Link className="flex w-full items-center gap-2" to={`/${index}`}>
                <span className="w-full">{todo.title}</span>
              </Link>
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
