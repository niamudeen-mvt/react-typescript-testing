import React, { useState } from "react";
import editIcon from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/trash.svg";
import submitIcon from "../assets/icons/check.svg";

interface ITask {
  title: string;
  isDone: boolean;
  isEdit: boolean;
}

interface Props {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const Listing = ({ tasks, setTasks }: Props) => {
  const [todo, setTodo] = useState("");

  const deleteTask = (index: number) => {
    const filterdTasks = tasks.filter((task, i) => i !== index);
    setTasks(filterdTasks);
  };

  const handleEdit = (index: number) => {
    console.log("edit", index);
    const copiedTasks = [...tasks];
    copiedTasks[index].isEdit = true;
    setTasks(copiedTasks);
  };

  const editTask = (index: number) => {
    const copiedTasks = [...tasks];

    const tempObj = {
      title: todo,
      isEdit: false,
      isDone: false,
    };
    copiedTasks[index] = tempObj;
    setTasks(copiedTasks);
    setTodo("");
  };

  return (
    <ul className="w-full max-h-[70vh] overflow-auto">
      {tasks.map((el, index) => {
        return (
          <li className="bg-white py-3 my-3 rounded-lg px-3 text-slate-500 shadow-sm flex justify-between">
            {el.isEdit ? (
              <input
                type="text"
                placeholder="Enter Task...."
                className="outline-none"
                value={todo}
                onChange={(event) => setTodo(event.target.value)}
                spellCheck={false}
              />
            ) : (
              <input
                type="text"
                placeholder="Enter Task...."
                className="outline-none"
                value={el.title}
                readOnly={true}
                spellCheck={false}
              />
            )}
            <div className="flex items-center gap-2">
              {el.isEdit ? (
                <span
                  className="cursor-pointer"
                  onClick={() => editTask(index)}
                >
                  <img
                    src={submitIcon}
                    alt="edit-icon"
                    className="task__icon"
                  />
                </span>
              ) : (
                <>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleEdit(index)}
                  >
                    <img
                      src={editIcon}
                      alt="edit-icon"
                      className="task__icon"
                    />
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => deleteTask(index)}
                  >
                    <img
                      src={deleteIcon}
                      alt="edit-icon"
                      className="task__icon"
                    />
                  </span>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Listing;
