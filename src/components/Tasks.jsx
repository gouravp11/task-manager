import React, { useContext } from "react";
import Task from "./Task";
import { appContext } from "../utils/context";
import AddTask from "./AddTask";
import { useLocation } from "react-router-dom";

const Tasks = () => {
  const { tasks, setTasks } = useContext(appContext);
  const { search } = useLocation();
  const dateFactor = search ? Number(search.split("&")[2]) : 0;
  const date = new Date(new Date());
  date.setDate(date.getDate() + dateFactor);
  if (dateFactor !== 0) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
  }
  const day = search ? Number(search.split("&")[1]) : date.getDate();
  const filteredTasks = tasks.filter((task,i) => task.date.getDate() === day);
  console.log("tasks: ",tasks);
  console.log("filtered tasks: ",filteredTasks)
  return (
    <div
      className={`container p-3 w-full h-[83%] rounded-b-md mt-2 sm:mt-0 sm:border-y-8 border-zinc-100 lg:w-[50%] sm:bg-zinc-100 overflow-y-auto transition-all`}
    >
      <AddTask />
      {filteredTasks && (
          filteredTasks.map((task, index) => (
            <Task key={index} task={task} taskId={task.taskId} />
          ))
      )
      }
    </div>
  );
};

export default Tasks;
