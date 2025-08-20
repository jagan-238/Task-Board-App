import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../styles/Task.css";

function Task({ task, colId, index, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    data: { colId, index },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="task" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        <strong>{task.title}</strong>
        {task.description && <p>{task.description}</p>}
      </div>
      <button className="delete-btn" onClick={() => deleteTask(colId, task.id)}>✕</button>
    </div>
  );
}

export default Task;
