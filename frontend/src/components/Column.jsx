import React from "react";
import Task from "./Task";
import "../styles/Column.css";

function Column({ colId, name, tasks, deleteTask }) {
  return (
    <div className="column" data-col={colId}>
      <h2>{name}</h2>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} colId={colId} deleteTask={deleteTask} />
      ))}
    </div>
  );
}

export default Column;

