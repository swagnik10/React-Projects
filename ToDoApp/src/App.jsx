/*
  Composition Layer
  Very thin component:
  Wraps app with Provider
  Renders layout
  No heavy logic
*/
import "./styles/app.css";
import TodoForm from "./component/TodoForm.jsx";
import TodoList from "./component/TodoList";
import FilterBar from "./component/FilterBar";
function App() {

  return (
    <div className="app-container">
      <h1>Todo App (Clean Architecture)</h1>
      <TodoForm />
      <FilterBar />
      <TodoList />
    </div>
  )
}

export default App

/* 
    Application Structure:
  * App - 	State management + business logic
  * TodoForm - 	Controlled input + submit
  * FilterBar - 	Filter selection UI
  * TodoList -	Render list
  * TodoItem -	Individual task actions
*/
/* FLow Diagram:
    App mounts
      ↓
    TodoProvider initializes state
      ↓
    Load todos from localStorage (useEffect)
      ↓
    Context provides state + actions to all components
      ↓
    User interacts (Add/Edit/Delete/Filter)
      ↓
    State updates in Context
      ↓
    Auto-sync to localStorage
      ↓
    UI re-renders via Context consumers
*/
