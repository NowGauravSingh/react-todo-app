import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import "./index.css";

const FILTERS = { ALL: "All", ACTIVE: "Active", COMPLETED: "Completed" };

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) {
      alert("Task cannot be empty!");
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: trimmed, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const toggleComplete = (id) =>
    setTasks(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));

  const getFilteredTasks = () => {
    let filtered = tasks;
    if (filter === FILTERS.ACTIVE) filtered = tasks.filter((t) => !t.completed);
    else if (filter === FILTERS.COMPLETED) filtered = tasks.filter((t) => t.completed);

    filtered.sort((a, b) =>
      sortOrder === "asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
    );

    return filtered;
  };

  return (
    <div className="app">
      <h1>📝 React To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filter-sort">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>

      <ul className="todo-list">
        {getFilteredTasks().map((task) => (
          <Todo key={task.id} task={task} onDelete={deleteTask} onToggle={toggleComplete} />
        ))}
      </ul>
    </div>
  );
}

export default App;
