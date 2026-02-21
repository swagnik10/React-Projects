/* Core Logic Layer Will handle:
    todos state
    filter state
    editingTodo state
    addTodo()
    deleteTodo()
    updateTodo()
    toggleTodo()
    localStorage persistence
*/
import { createContext, useContext, useEffect, useState, useMemo } from "react";

// 1. Create Context
const TodoContext = createContext();

// 2. Custom Hook (Cleaner consumption)
export const useTodos = () => {
  return useContext(TodoContext);
};

// 3. Provider Component (Global State Manager)
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load todos from localStorage on first render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setIsHydrated(true); 
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
     if (!isHydrated) return;
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos,isHydrated]);

  // Add Todo
  const addTodo = (text) => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editingTodo && editingTodo.id === id) {
      setEditingTodo(null);
    }
  };

  // Toggle Complete
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
    /*
        Click Edit → startEditing(todo)
        Form auto-fills
        Submit → updateTodo()
        Context resets editing state
    */
  // Start Editing
  const startEditing = (todo) => {
    setEditingTodo(todo);
  };

  // Update Todo (Save Edit)
  const updateTodo = (id, newText) => {
    if (!newText.trim()) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );

    setEditingTodo(null);
  };

  // Cancel Editing
  const cancelEditing = () => {
    setEditingTodo(null);
  };

  // Derived State (Filtered Todos) — RIGHT WAY
  const filteredTodos = useMemo(() => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    if (filter === "pending") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  }, [todos, filter]);

  var value = {
        // state
        todos,
        filter,
        editingTodo,
        filteredTodos,

        // actions (business logic)
        addTodo,
        deleteTodo,
        toggleTodo,
        startEditing,
        updateTodo,
        cancelEditing,
        setFilter
      };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};