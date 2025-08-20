// App.jsx
import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import "./styles/App.css";
import "./App.css";
const initialColumns = {
  todo: { name: "To-Do", items: [] },
  inProgress: { name: "In Progress", items: [] },
  done: { name: "Done", items: [] },
};

function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("taskBoard");
    return saved ? JSON.parse(saved) : initialColumns;
  });

  useEffect(() => {
    localStorage.setItem("taskBoard", JSON.stringify(columns));
  }, [columns]);

  const addTask = (title, description) => {
    if (!title) return;
    const newTask = { id: Date.now().toString(), title, description };
    setColumns((prev) => ({
      ...prev,
      todo: { ...prev.todo, items: [newTask, ...prev.todo.items] },
    }));
  };

  const deleteTask = (colId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [colId]: { ...prev[colId], items: prev[colId].items.filter(t => t.id !== taskId) }
    }));
  };

  const updateColumns = (newColumns) => setColumns(newColumns);

  return (
    <div className="app">
      <h1 className="title">Task Board</h1>
      <TaskForm addTask={addTask} />
      <Board columns={columns} deleteTask={deleteTask} updateColumns={updateColumns} />
    </div>
  );
}

export default App;
