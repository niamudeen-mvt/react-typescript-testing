import { useState } from "react";
import Listing from "../../components/Listing";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { sendNotification } from "../../utils/notifications";

interface ITask {
  title: string;
  isTaskComplete: boolean;
  isEdit: boolean;
}

const TaskPage = () => {
  const [dragOver, setDragOver] = useState(false);

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState({
    title: "",
    isEdit: false,
    isTaskComplete: false,
  });
  const [completeTask, setCompleteTask] = useState<ITask[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTask({
      ...task,
      title: event.target.value,
    });
  };

  const handleAddTask = () => {
    if (task.title) {
      sendNotification("success", "Task Added Successfully");
      setTasks([...tasks, task]);

      setTask({
        title: "",
        isEdit: false,
        isTaskComplete: false,
      });
    }
  };

  //  ======== DRAG AND DROP =============================
  const handleDragOverStart = () => setDragOver(true);
  const handleDragOverEnd = () => setDragOver(false);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
    console.log("dragging");
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    console.log(`Somebody dropped an element with id: ${id}`);
    const tempObj = tasks.filter((task, i) => i === parseInt(id))[0];

    const filterdTasks = tasks.filter((task, i) => i !== parseInt(id));
    setTasks(filterdTasks);

    setCompleteTask([...completeTask, { ...tempObj, isTaskComplete: true }]);
    setDragOver(false);
  };

  const removeCompleteTask = (index: number) => {
    const task = completeTask.filter((task, i) => i === index)[0];

    const copiedTaskList = [...tasks];
    console.log(copiedTaskList);
    copiedTaskList.push({
      ...task,
      isTaskComplete: false,
    });

    setTasks(copiedTaskList);
    const filterdTasks = completeTask.filter((task, i) => i !== index);
    setCompleteTask(filterdTasks);

    sendNotification("warning", "Task is Pending");
  };

  const taskCompleted = (index: number) => {
    const filterdTasks = completeTask.filter((task, i) => i !== index);
    setCompleteTask(filterdTasks);

    sendNotification("success", "Task is completed");
  };

  return (
    <section className="bg-slate-500 h-screen">
      <div className="custom__container flex__center">
        <div className="flex flex-col gap-6 w-full max-w-[1200px]">
          <div className="flex gap-6">
            <input
              type="text"
              placeholder="Enter Task...."
              className="bg-white w-full rounded-lg px-3 text-slate-500 h-12 outline-none"
              value={task.title}
              onChange={handleChange}
              spellCheck={false}
            />
            <button
              className="h-12 bg-white rounded-md text-sm w-32 uppercase font-semibold"
              onClick={handleAddTask}
            >
              <p className="w-full">Add Task</p>
            </button>
          </div>
          <div className="grid  grid-cols-1 sm:grid-cols-2 mx-auto w-full gap-10 max-h-[70vh] sm:h-full overflow-auto sm:overflow-auto">
            <div className="flex flex-col gap-y-10 p-5 bg-slate-300/25 opacity-100 rounded-lg  min-h-[300px]">
              <Listing
                tasks={tasks}
                setTasks={setTasks}
                handleDragStart={handleDragStart}
              />
            </div>
            <div
              className="bg-slate-300/25 opacity-100 w-full min-h-[300px] p-5 rounded-lg"
              onDragOver={enableDropping}
              onDrop={handleDrop}
              onDragEnter={handleDragOverStart}
              onDragLeave={handleDragOverEnd}
            >
              <div>
                <h4 className="text-center text-white">Complete Task</h4>
                <ul className="w-full  overflow-auto">
                  {completeTask.map((el, index) => {
                    return (
                      <li className="bg-white my-3 rounded-lg px-3 text-slate-500 shadow-sm flex justify-between">
                        <input
                          type="text"
                          placeholder="Enter Task...."
                          className="outline-none cursor-pointer w-full bg-transparent py-3"
                          value={el.title}
                          spellCheck={false}
                          id={index.toString()}
                          draggable={true}
                          onDragStart={handleDragStart}
                          disabled={true}
                        />
                        <div className="flex items-center gap-4 text-black">
                          <span
                            className="cursor-pointer"
                            onClick={() => taskCompleted(index)}
                          >
                            <FaCheck />
                          </span>
                          <span className="cursor-pointer">
                            <AiOutlineDelete
                              onClick={() => removeCompleteTask(index)}
                            />
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskPage;
