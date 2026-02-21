import TodoItem from "./TodoItem";
import { useTodos } from "../context/TodoContext";

const TodoList = () => {
  const { filteredTodos } = useTodos();

  if (filteredTodos.length === 0) {
    return <p className="empty-msg">No tasks to show</p>;
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;