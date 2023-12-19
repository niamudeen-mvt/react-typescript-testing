import { useEffect, useState } from "react";
import ActiveTasks from "./ActvieTask";
import { MdDelete } from "react-icons/md";
import ReactTyped from "react-typed";
import { sendNotification } from "../../../utils/notifications";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { IoMdThumbsUp } from "react-icons/io";
import { useAuth } from "../../../context/authContext";
import ThemeContainer from "../../../components/layout/ThemeContainer";
import Stories from "../../../components/story";

interface ITask {
  id: string;
  title: string;
  isTaskComplete: boolean;
  isEdit: boolean;
}

const TaskPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [completeTask, setCompleteTask] = useState<ITask[]>([]);
  const { authUser } = useAuth();
  const [task, setTask] = useState({
    id: "",
    title: "",
    isEdit: false,
    isTaskComplete: false,
  });

  // GETTING TASK AND COMPLETE TASKS FROM LOCALSTORAGE

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

  // SETTTING TASK AND COMPLETE TASKS IN LOCALSTORAGE

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completeTask", JSON.stringify(completeTask));
  }, [completeTask]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const unique_id = uuidv4();

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

        // RESETTING TASK
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

    const draggedTask =
      source.droppableId === "activeTask"
        ? active[source.index]
        : complete[source.index];

    if (source.droppableId === "activeTask") {
      active.splice(source.index, 1);
    } else {
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "activeTask") {
      active.splice(destination.index, 0, draggedTask);
    } else {
      complete.splice(destination.index, 0, draggedTask);
      sendNotification("success", "Task is completed");
    }

    setTasks(active);
    setCompleteTask(complete);
  };

  const removeCompleteTask = (id: string) => {
    const task = completeTask.find((task, i) => task.id === id);
    if (task) {
      const copiedTaskList = [...tasks];

      task.isTaskComplete = false;
      copiedTaskList.push(task);

      // ADDING REMOVED TASK INTO TASKS
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

  return (
    <ThemeContainer>
      <Stories />
      <div className="py-32">
        <h1 className="text-2xl sm:text-5xl mb-20 text-white font-semibold text-center capitalize">
          Welcome {authUser?.name} to{" "}
          <ReactTyped strings={["Taskify"]} typeSpeed={100} loop />
        </h1>

        <form onSubmit={handleAddTask} className="flex gap-6 mb-10 w-full">
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

        <DragDropContext onDragEnd={handleAfterDrop}>
          <div className="grid  grid-cols-1 sm:grid-cols-2 mx-auto w-full gap-10 max-h-[90vh] sm:h-full overflow-auto sm:overflow-auto">
            {/* Active task list */}
            <ActiveTasks tasks={tasks} setTasks={setTasks} />

            <div>
              <p className="text-white text-center mb-3">Completed Tasks</p>
              <Droppable droppableId="completeTask">
                {(provided, snaphsot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-full flex flex-col gap-y-3 min-h-[50px]  min-w-[300px] flex__center p-3 rounded-lg transition-all duration-300 ${
                      snaphsot.isDraggingOver
                        ? "bg-green-400"
                        : "bg-slate-300/25"
                    }`}
                  >
                    {completeTask?.length ? (
                      completeTask.map((el, index) => {
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
                      })
                    ) : snaphsot.isDraggingOver ? null : (
                      <div>No complete tasks to show</div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </ThemeContainer>
  );
};

export default TaskPage;
