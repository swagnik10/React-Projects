import { useEffect, useState } from "react";
import { useTodos } from "../context/TodoContext";

const TodoForm = () => {
  const { addTodo, updateTodo, editingTodo, cancelEditing } = useTodos();

  const [input, setInput] = useState("");

  // Auto-fill input when editingTodo changes (Edit Mode)
  useEffect(() => {
    if (editingTodo) {
      setInput(editingTodo.text);
    } else {
      setInput("");
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTodo) {
      // Update existing todo
      updateTodo(editingTodo.id, input);
    } else {
      // Add new todo
      addTodo(input);
    }

    setInput(""); // reset after submit
  };

  const handleCancel = () => {
    cancelEditing();
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-input"
      />

      <button type="submit" className="todo-submit">
        {editingTodo ? "Update Task" : "Add Task"}
      </button>

      {editingTodo && (
        <button
          type="button"
          className="todo-cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TodoForm;