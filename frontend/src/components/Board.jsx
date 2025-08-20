import React from "react";
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Column from "./Column";
import "../styles/Board.css";

function Board({ columns, deleteTask, updateColumns }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = ({ active, over }) => {
    if (!over) return;

    const { colId: sourceCol, index: sourceIndex } = active.data.current;
    const { colId: destCol, index: destIndex } = over.data.current;

    if (sourceCol === destCol && sourceIndex === destIndex) return;

    const newColumns = { ...columns };
    const movedTask = newColumns[sourceCol].items[sourceIndex];

    newColumns[sourceCol].items.splice(sourceIndex, 1);
    newColumns[destCol].items.splice(destIndex, 0, movedTask);

    updateColumns(newColumns);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="board">
        {Object.entries(columns).map(([colId, col]) => (
          <SortableContext
            key={colId}
            items={col.items.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <Column colId={colId} name={col.name} tasks={col.items} deleteTask={deleteTask} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}

export default Board;

