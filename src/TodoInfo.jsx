import { useParams } from "react-router-dom";

function TodoItem() {
  const { id } = useParams();
  const todoItem = [
    {
      title: "Todo Title",
      completed: false,
    },
    {
      title: "Todo Title",
      completed: false,
    },
  ];
  
  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-96 space-y-2">
        <h1 className="text-3xl">Todo App</h1>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">{`Todo Title - ${id}`}</h2>
          <button className="p-2 rounded bg-green-500 hover:bg-green-400 active:bg-green-500 active:scale-95 text-white transition">
            Edit
          </button>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
          architecto vitae explicabo placeat enim, et ex voluptatibus possimus
          maiores sed ab maxime doloremque! Aliquam cupiditate ipsa, iure
          aspernatur optio a.
        </p>
        <hr />
        <div className="flex w-ful gap-2">
          <input type="text" className="border shadow rounded w-full p-1" />
          <button className="p-2 rounded bg-green-500 hover:bg-green-400 active:bg-green-500 active:scale-95 text-white transition">
            Add
          </button>
        </div>

        <hr />

        {todoItem.length === 0 && (
          <div className="text-center text-gray-500">No todos found</div>
        )}

        <div className="space-y-2">
          {todoItem.map((todo, index) => (
            <div
              key={index}
              className="flex justify-between items-center border shadow rounded p-2"
            >
              <div className="flex w-full gap-2">
                <input type="checkbox" className="w-6 h-6" />
                <span className="w-full">{todo.title}</span>
              </div>
              <button className="p-2 rounded bg-red-500 hover:bg-red-400 active:bg-red-500 active:scale-95 text-white transition">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
