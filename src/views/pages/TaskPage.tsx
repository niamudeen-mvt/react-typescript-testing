import { useState } from "react";
import Listing from "../../components/Listing";

interface ITask {
  title: string;
  isDone: boolean;
  isEdit: boolean;
}

const TaskPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState({
    title: "",
    isEdit: false,
    isDone: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTask({
      ...task,
      title: event.target.value,
    });
  };

  const handleAddTask = () => {
    if (task.title) {
      setTasks([...tasks, task]);

      setTask({
        title: "",
        isEdit: false,
        isDone: false,
      });
    }
  };

  return (
    <section className="h-screen   flex flex-col justify-center items-center bg-slate-500 ">
      <div className="flex flex-col gap-6">
        <div className="flex  gap-6">
          <input
            type="text"
            placeholder="Enter Task...."
            className="bg-white rounded-lg px-3 text-slate-500 h-12 outline-none"
            value={task.title}
            onChange={handleChange}
            spellCheck={false}
          />
          <button
            className="h-12 bg-white rounded-md text-sm px-3 uppercase font-semibold"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
        <Listing tasks={tasks} setTasks={setTasks} />
      </div>
    </section>
  );
};

export default TaskPage;
