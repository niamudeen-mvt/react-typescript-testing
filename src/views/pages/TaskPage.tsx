import { useEffect, useState } from "react";
import Listing from "../../components/Listing";
import { MdDelete } from "react-icons/md";
import ReactTyped from "react-typed";
import { sendNotification } from "../../utils/notifications";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { IoMdThumbsUp } from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";

interface ITask {
  id: string;
  title: string;
  isTaskComplete: boolean;
  isEdit: boolean;
}

const TaskPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [completeTask, setCompleteTask] = useState<ITask[]>([]);
  const [task, setTask] = useState({
    id: "",
    title: "",
    isEdit: false,
    isTaskComplete: false,
  });

  console.log(user, "user");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const storedCompleteTask = JSON.parse(
      localStorage.getItem("completeTask") || "[]"
    );

    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    } else if (storedCompleteTask.length > 0) {
      setCompleteTask(storedCompleteTask);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completeTask", JSON.stringify(completeTask));
  }, [completeTask]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const unique_id = uuidv4();

    // upating task details
    setTask({
      id: unique_id,
      title: event.target.value,
      isEdit: false,
      isTaskComplete: false,
    });
  };

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (task.title) {
      const existTask = tasks.find((el) => el.title === task.title.trim());

      if (existTask) {
        sendNotification("warning", "Task already exist");
      } else {
        sendNotification("success", "Task Added Successfully");
        setTasks([...tasks, task]);

        setTask({
          id: "",
          title: "",
          isEdit: false,
          isTaskComplete: false,
        });
      }
    } else {
      sendNotification("warning", "Please enter task");
    }
  };

  //  ======== DRAG AND DROP =============================

  const handleAfterDrop = (result: DropResult) => {
    const { destination, source } = result;

    // IF NOT DROP +====================
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
    let complete = completeTask.slice();

    // Get the task that is being dragged
    const draggedTask =
      source.droppableId === "activeTask"
        ? active[source.index]
        : complete[source.index];

    // Remove the task from its source list
    if (source.droppableId === "activeTask") {
      active.splice(source.index, 1);
    } else {
      complete.splice(source.index, 1);
    }

    // If the destination is activeTask, insert the task into the active list
    if (destination.droppableId === "activeTask") {
      active.splice(destination.index, 0, draggedTask);
    } else {
      // Otherwise, insert the task into the complete list
      complete.splice(destination.index, 0, draggedTask);
      sendNotification("success", "task is completed");
    }

    // Update the state with the modified lists
    setTasks(active);
    setCompleteTask(complete);
  };

  const removeCompleteTask = (id: string) => {
    const task = completeTask.find((task, i) => task.id === id);
    if (task) {
      const copiedTaskList = [...tasks];

      task.isTaskComplete = false;
      copiedTaskList.push(task);

      setTasks(copiedTaskList);
    }

    const filterdTasks = completeTask.filter((task, i) => task.id !== id);
    setCompleteTask(filterdTasks);

    sendNotification("warning", "Task is Pending");
  };

  const taskCompleted = (id: string) => {
    const filterdTasks = completeTask.filter((task, i) => task.id !== id);
    setCompleteTask(filterdTasks);

    sendNotification("success", "Task is completed");
  };

  if (isLoading) return <div>Loading..........</div>;
  return (
    <section className="bg-slate-500 h-screen">
      <div className="custom__container py-20 flex__center  flex-col mb-3">
        <div>
          <h1 className="text-4xl sm:text-5xl mb-20 text-white font-semibold text-center">
            Welcome {user?.nickname} to{" "}
            <ReactTyped strings={["Taskify"]} typeSpeed={100} loop />
          </h1>
        </div>
        <div className="flex gap-6 mb-5 w-full">
          <form onSubmit={handleAddTask} className="flex gap-6 w-full">
            <input
              type="text"
              placeholder="Enter Task...."
              className="bg-white w-full rounded-lg px-3 text-black h-12 outline-none"
              value={task.title}
              onChange={handleChange}
              spellCheck={false}
            />
            <button
              type="submit"
              className="h-12 bg-slate-900 rounded-md text-sm w-32 uppercase font-semibold text-white hover:bg-slate-700"
            >
              <p className="w-full">Add Task</p>
            </button>
          </form>
        </div>
        <DragDropContext onDragEnd={handleAfterDrop}>
          <div className="grid  grid-cols-1 sm:grid-cols-2 mx-auto w-full gap-10 max-h-[90vh] sm:h-full overflow-auto sm:overflow-auto">
            <Listing tasks={tasks} setTasks={setTasks} />
            <div className="bg-slate-300/25 p-3 rounded-lg">
              <p className="text-white text-center">Completed Tasks</p>
              <Droppable droppableId="completeTask">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-full flex flex-col gap-y-3  min-w-[300px] flex__center p-3"
                  >
                    {completeTask.map((el, index) => {
                      return (
                        <Draggable
                          key={el.id}
                          draggableId={el.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="rounded-lg p-3 text-black shadow-sm w-full bg-white flex__SB"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <p>
                                {index + 1}.{` `}
                                {el.title}
                              </p>
                              <div className="flex items-center gap-4 text-black">
                                <span
                                  className="cursor-pointer"
                                  onClick={() => taskCompleted(el.id)}
                                >
                                  <IoMdThumbsUp size={22} />
                                </span>
                                <span className="cursor-pointer">
                                  <MdDelete
                                    size={20}
                                    onClick={() => removeCompleteTask(el.id)}
                                  />
                                </span>
                              </div>
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
          </div>
        </DragDropContext>
      </div>
    </section>
  );
};

export default TaskPage;
