import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pb from "./connector/pocketbase.js";
import TodoHeader from "./TodoHeader.jsx";
import DisplayTodoItems from "./DisplayTodoItems.jsx";
import EditingTodo from "./EditingTodo.jsx";

function TodoInfo() {
  const { id } = useParams(); // ดึงค่า ID จาก URL param

  const [todo, setTodo] = useState({}); // Todo ที่จะแสดง
  const [isEditing, setIsEditing] = useState(false); // กำลัง Edit อยู่หรือไม่
  const [title, setTitle] = useState(""); // ชื่อ Todo
  const [todoItem, setTodoItem] = useState([]);

  useEffect(() => {
    const getTodo = async () => {
      const fetchedTodo = await pb.collection("todo").getOne(id, {
        expand: "todoItem",
      }); // ทำการ Fetch Todo ที่มี ID ตามที่ระบุ
      setTodo(fetchedTodo);
      setTodoItem(fetchedTodo.expand.todoItem || []);
    };
    getTodo();
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const updateTodo = async (todo) => {
    const updatedTodo = await pb.collection("todo").update(id, todo);
    setTodo(updatedTodo);
    setIsEditing(false);
  };

  const addTodoItem = async () => {
    const newTodoItem = await pb.collection("todoItem").create({
      title,
    });
    const updatedTodo = await pb.collection("todo").update(
      id,
      {
        todoItem: [...todo.todoItem, newTodoItem.id],
      },
      {
        expand: "todoItem",
      }
    );
    setTodo(updatedTodo);
    setTodoItem(updatedTodo.expand.todoItem);
    setTitle("");
  };

  const deleteTodoItem = async (todoItemId) => {
    const updatedTodo = await pb.collection("todo").update(
      id,
      {
        todoItem: todo.todoItem.filter((todoItem) => todoItem !== todoItemId),
      },
      {
        expand: "todoItem",
      }
    );
    await pb.collection("todoItem").delete(todoItemId);
    setTodo(updatedTodo);
    setTodoItem(updatedTodo.expand.todoItem);
  };

  const checkTodoItem = async (todoItemId) => {
    const todoItemInfo = todoItem.find((todoItem) => todoItem.id === todoItemId);
    const updatedTodoItem = await pb.collection("todoItem").update(todoItemId, {
      completed: !todoItemInfo.completed,
    });
    setTodoItem(
      todoItem.map((todoItem) =>
        todoItem.id === todoItemId ? updatedTodoItem : todoItem
      )
    );
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-96 space-y-2">
        <h1 className="text-3xl">Todo App</h1>
        {!isEditing ? (
          <TodoHeader todo={todo} editTodo={() => setIsEditing(!isEditing)} />
        ) : (
          <EditingTodo todo={todo} updateTodo={updateTodo} />
        )}
        <hr />
        <div className="flex w-ful gap-2">
          <input
            onChange={handleTitleChange}
            value={title}
            type="text"
            className="border shadow rounded w-full p-1"
          />
          <button
            onClick={addTodoItem}
            className="p-2 rounded bg-green-500 hover:bg-green-400 active:bg-green-500 active:scale-95 text-white transition"
          >
            Add
          </button>
        </div>
        <hr />
        <DisplayTodoItems
          todoItem={todoItem}
          deleteTodoItem={deleteTodoItem}
          checkTodoItem={checkTodoItem}
        />
      </div>
    </div>
  );
}

export default TodoInfo;
