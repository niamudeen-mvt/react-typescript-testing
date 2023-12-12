import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { sendNotification } from "../utils/notifications";

interface ITask {
  title: string;
  isTaskComplete: boolean;
  isEdit: boolean;
}

interface Props {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Listing = ({ tasks, setTasks, handleDragStart }: Props) => {
  const [todo, setTodo] = useState("");

  const deleteTask = (index: number) => {
    const filterdTasks = tasks.filter((task, i) => i !== index);
    setTasks(filterdTasks);
    sendNotification("error", "Task Deleted Successfully");
  };

  const handleEdit = (index: number) => {
    console.log("edit", index);
    const copiedTasks = [...tasks];
    copiedTasks[index].isEdit = true;
    setTasks(copiedTasks);
  };

  const editTask = (index: number) => {
    if (todo) {
      const copiedTasks = [...tasks];

      const tempObj = {
        title: todo,
        isEdit: false,
        isTaskComplete: false,
      };
      copiedTasks[index] = tempObj;
      setTasks(copiedTasks);
      setTodo("");
      sendNotification("success", "Task Edited Successfully");
    } else {
      sendNotification("warning", "This field is required");
    }
  };

  return (
    <div>
      <h4 className="text-center text-white">Tasks</h4>
      <ul className="w-full">
        {tasks.map((el, index) => {
          return (
            <li className="bg-white  my-3 rounded-lg px-3 text-slate-500 shadow-sm flex justify-between border">
              {el.isEdit ? (
                <input
                  type="text"
                  placeholder="Edit Task...."
                  className="outline-none bg-transparent  w-full py-3"
                  value={todo}
                  onChange={(event) => setTodo(event.target.value)}
                  spellCheck={false}
                />
              ) : (
                <input
                  type="text"
                  placeholder="Enter Task...."
                  className="outline-none cursor-pointer bg-transparent w-full py-3"
                  value={el.title}
                  spellCheck={false}
                  id={index.toString()}
                  draggable={true}
                  onDragStart={handleDragStart}
                  disabled={true}
                />
              )}
              <div className="flex items-center gap-2">
                {el.isEdit ? (
                  <FaCheck
                    className="cursor-pointer text-black "
                    onClick={() => editTask(index)}
                  />
                ) : (
                  <>
                    <FiEdit
                      className="cursor-pointer text-black "
                      onClick={() => handleEdit(index)}
                    />
                    <AiOutlineDelete
                      className="cursor-pointer text-black"
                      onClick={() => deleteTask(index)}
                    />
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Listing;
