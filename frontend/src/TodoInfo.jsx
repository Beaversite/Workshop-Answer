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
  const [title, setTitle] = useState(""); // ชื่อ Todo ที่จะเพิ่มเข้าภายในรายการย่อย

  const getTodo = async () => {
    const fetchedTodo = await pb.collection("todo").getOne(id, {
      expand: "todoItem",
    }); // ทำการ Fetch Todo ที่มี ID ตามที่ระบุ
    setTodo(fetchedTodo);
  };

  useEffect(() => {
    getTodo();
  }, [id]);

  useEffect(() => {
    console.log(todo);
  }, [todo]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const updateTodo = async (todo) => {
    try {
      const updatedTodo = await pb.collection("todo").update(id, todo, {
        expand: "todoItem",
      });

      // ทำการแก้ไข State เพื่อให้แสดงผลใหม่
      setTodo(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  // เพิ่ม todoItem ลงใน Collection todoItem ใน Pocketbase
  const addTodoItem = async () => {
    try {
      const createdTodoItem = await pb.collection("todoItem").create({
        title,
        completed: false,
      });

      // Array ที่จะเก็บรายการ id ของ todoItem รวมของที่สร้างใหม่แล้วด้วย
      const toUpdateTodoItem = [];
      if (todo?.expand?.todoItem) {
        toUpdateTodoItem.push(...todo.expand.todoItem.map((item) => item.id));
      }
      toUpdateTodoItem.push(createdTodoItem.id);

      const updatedTodo = await pb.collection("todo").update(
        id,
        {
          ...todo,
          todoItem: toUpdateTodoItem,
        },
        {
          expand: "todoItem",
        }
      );

      // ทำการแก้ไข State เพื่อให้แสดงผลใหม่
      setTodo(updatedTodo);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  // ลบ todoItem ออกจาก Collection todoItem ใน Pocketbase
  const deleteTodoItem = async (todoItemId) => {
    try {
      const isDeletedTodoItem = await pb.collection("todoItem").delete(todoItemId);
      // ทำการแก้ไข State เพื่อให้แสดงผลใหม่
      setTodo({ ...todo, expand: { todoItem: todo?.expand?.todoItem.filter((item) => item.id != todoItemId) } });
    } catch (error) {
      console.log(error);
    }
  };

  // อัพเดท todoItem ใน Collection todoItem ใน Pocketbase
  const checkTodoItem = async (todoItemId) => {
    try {
      const toChangeTodoItem = todo.expand.todoItem.find((item) => item.id === todoItemId); // object ของ todoItem ที่จะเปลี่ยนแปลง
      const updatedTodoItem = await pb
        .collection("todoItem")
        .update(todoItemId, { ...toChangeTodoItem, completed: !toChangeTodoItem.completed });

      // ทำการแก้ไข State เพื่อให้แสดงผลใหม่
      setTodo({
        ...todo,
        expand: {
          todoItem: todo.expand.todoItem.map((item) => (item.id === todoItemId ? updatedTodoItem : item)),
        },
      });
    } catch (error) {
      console.log(error);
    }
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
          <input onChange={handleTitleChange} value={title} type="text" className="border shadow rounded w-full p-1" />
          <button
            onClick={addTodoItem}
            className="p-2 rounded bg-green-500 hover:bg-green-400 active:bg-green-500 active:scale-95 text-white transition"
          >
            Add
          </button>
        </div>
        <hr />
        <DisplayTodoItems
          todoItems={todo?.expand?.todoItem || []}
          deleteTodoItem={deleteTodoItem}
          checkTodoItem={checkTodoItem}
        />
      </div>
    </div>
  );
}

export default TodoInfo;
