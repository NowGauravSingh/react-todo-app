import React from "react";

function Todo({ task, onDelete, onToggle }) {
  return (
    <li className={`todo ${task.completed ? "completed" : ""}`}>
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
}

export default Todo;
