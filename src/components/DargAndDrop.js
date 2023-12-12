import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
  },
  {
    id: 2,
    title: "Task 2",
  },
  {
    id: 3,
    title: "Task 3",
  },
];

interface ITodo {
  id: number;
  title: string;
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [completedTasks, setCompletedTasks] = useState<ITodo[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let active = tasks.slice();
    let complete = completedTasks.slice();

    // Get the task that is being dragged
    const draggedTask =
      source.droppableId === "tasks"
        ? active[source.index]
        : complete[source.index];

    // Remove the task from its source list
    if (source.droppableId === "tasks") {
      active.splice(source.index, 1);
    } else {
      complete.splice(source.index, 1);
    }

    // If the destination is tasks, insert the task into the active list
    if (destination.droppableId === "tasks") {
      active.splice(destination.index, 0, draggedTask);
    } else {
      // Otherwise, insert the task into the complete list
      complete.splice(destination.index, 0, draggedTask);
    }

    // Update the state with the modified lists
    setTasks(active);
    setCompletedTasks(complete);
  };

  return (
    <div className="custom__container">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 gap-4">
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full flex flex-col gap-y-3 bg-slate-500 min-w-[300px] flex__center min-h-[300px]"
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="w-full"
                      >
                        <div className="bg-blue-500  w-full py-3 rounded-lg flex__center">
                          {task.title}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="active">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full flex flex-col gap-y-3 min-w-[300px] bg-red-600 px-3 flex__center"
              >
                {completedTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        key={task.id}
                        className="w-full"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className="bg-green-500 w-full py-3 rounded-lg flex__center">
                          {task.title}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;