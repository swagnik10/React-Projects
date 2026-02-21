import { useTodos } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
  const { toggleTodo, startEditing, deleteTodo } = useTodos();

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>

      <div className="todo-actions">
        <button className="edit-btn" onClick={() => startEditing(todo)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;