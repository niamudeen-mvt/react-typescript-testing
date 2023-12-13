import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { sendNotification } from "../utils/notifications";
import { IoMdThumbsUp } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

interface ITask {
  id: string;
  title: string;
  isTaskComplete: boolean;
  isEdit: boolean;
}

interface Props {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const Listing = ({ tasks, setTasks }: Props) => {
  const [todo, setTodo] = useState("");
  const [editTaskId, setEditTaskId] = useState("");

  const deleteTask = (id: string) => {
    const filterdTasks = tasks.filter((task, i) => task.id !== id);
    setTasks(filterdTasks);
    sendNotification("error", "Task Deleted Successfully");
  };

  const handleEdit = (id: string) => {
    setEditTaskId(id);
    const existIndex = tasks.findIndex((task) => task.id === id);

    if (existIndex > -1) {
      // const copiedTasks = [...tasks];
      // copiedTasks[existIndex].isEdit = true;

      const copiedTasks = tasks.map((task, index) => {
        if (index === existIndex)
          return {
            ...task,
            isEdit: true,
          };

        return {
          ...task,
          isEdit: false,
        };
      });

      setTasks(copiedTasks);
    }
  };

  const editTask = (event: React.FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();
    if (todo) {
      const existIndex = tasks.findIndex((task) => task.id === id);

      if (existIndex > -1) {
        const copiedTasks = [...tasks];
        copiedTasks[existIndex].title = todo;
        copiedTasks[existIndex].isEdit = false;

        setTasks(copiedTasks);
        setTodo("");
        sendNotification("success", "Task Edited Successfully");
      }
    } else {
      sendNotification("warning", "Please enter task");
    }
  };

  return (
    <div className="bg-slate-300/25 p-3 rounded-lg">
      <p className="text-white text-center">Active Tasks</p>
      <Droppable droppableId="activeTask">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full flex flex-col gap-y-3 min-w-[300px] flex__center p-3"
          >
            {tasks.map((el, index) => {
              return (
                <Draggable key={el.id} draggableId={el.id} index={index}>
                  {(provided) => (
                    <div
                      className="bg-white rounded-lg p-3 mb-3 text-black shadow-sm w-full flex__SB"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <form
                        onSubmit={(event) => editTask(event, el.id)}
                        className="flex__SB w-full"
                      >
                        {el.isEdit && el.id === editTaskId ? (
                          <input
                            type="text"
                            placeholder="Edit Task...."
                            className="outline-none bg-transparent w-full"
                            spellCheck={false}
                            value={todo}
                            onChange={(event) => setTodo(event.target.value)}
                          />
                        ) : (
                          <p>
                            {index + 1}.{` `}
                            {el.title}
                          </p>
                        )}
                        {el.isEdit && el.id === editTaskId ? (
                          <button type="submit">
                            <IoMdThumbsUp
                              className="cursor-pointer"
                              size={22}
                            />
                          </button>
                        ) : null}
                      </form>
                      {!el.isEdit ? (
                        <div className="flex items-center gap-4">
                          <AiFillEdit
                            size={20}
                            className="cursor-pointer"
                            onClick={() => handleEdit(el.id)}
                          />
                          <MdDelete
                            className="cursor-pointer"
                            onClick={() => deleteTask(el.id)}
                            size={20}
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Listing;
