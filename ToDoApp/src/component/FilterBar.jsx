import { useTodos } from "../context/TodoContext";

const FilterBar = () => {
  const { filter, setFilter } = useTodos();

  return (
    <div className="filter-bar">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "pending" ? "active" : ""}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>

      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterBar;