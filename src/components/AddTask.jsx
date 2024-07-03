import React, { useContext, useState } from "react";
import { appContext } from "../utils/context";
import TimeInput from "./TimeInput";

const AddTask = () => {
  const { tasks, setTasks } = useContext(appContext);
  const { addTask, setAddTask } = useContext(appContext);
  const addTaskToggler = () => {
    setAddTask(!addTask);
  };
  const validInput = (val) => {
    return val.replace(/[^0-9]+/g, "");
  }; 
  const [formData, setFormData] = useState({
    title: "",
    starttime: { hour: "", minute: "" },
    endtime: { hour: "", minute: "" },
    description: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setTasks([...tasks, formData]);
    setFormData({
      title: "",
      starttime: { hour: "", minute: "" },
      endtime: { hour: "", minute: "" },
      description: "",
    });
  };
  const handleStartTime = (e, action) => {
    if(action === "hour")
      setFormData({
        ...formData,
        starttime: { ...formData.starttime, hour: validInput(e.target.value) },
      });
    else if(action === "minute")
      setFormData({
        ...formData,
        starttime: { ...formData.starttime, minute: validInput(e.target.value) },
      });
  }
  const handleEndTime = (e, action) => {
    if(action === "hour")
      setFormData({
        ...formData,
        endtime: { ...formData.endtime, hour: validInput(e.target.value) },
      });
    else if(action === "minute")
      setFormData({
        ...formData,
        endtime: { ...formData.endtime, minute: validInput(e.target.value) },
      });
  }
  const startTimeInputValueSetter = (action) => {
    if (action === "hour") return formData.starttime.hour
    else if (action === "minute") return formData.starttime.minute
  }
  const endTimeInputValueSetter = (action) => {
    if (action === "hour") return formData.endtime.hour
    else if (action === "minute") return formData.endtime.minute
  }
  return (
    <div
      className={`w-full bg-zinc-200 rounded-md relative p-3 mb-5 ${
        addTask ? "block" : "hidden"
      }`}
    >
      <form action="" onSubmit={handleSubmit}>
        <input
          className="mb-1 w-full rounded-md outline-0 text-xs p-1"
          type="text"
          placeholder="title"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
          autoFocus
        />
        <div className="time flex items-center text-zinc-500 gap-2 text-xs my-1">
          <TimeInput
            handleTime={handleStartTime}
            setValue={startTimeInputValueSetter}
          />
          <span>-</span>
          <TimeInput
            handleTime={handleEndTime}
            setValue={endTimeInputValueSetter}
          />
        </div>
        <input
          className="w-full mt-1 rounded-md outline-0 text-xs p-1 sm:w-[70%]"
          type="text"
          placeholder="description"
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
        />
        <span
          onClick={addTaskToggler}
          className="mt-2 flex gap-1 sm:p-3 sm:m-0 sm:absolute bottom-0 right-0 cursor-pointer"
        >
          <input
            className="bg-blue-500 w-fit h-fit p-1 px-5 text-xs text-white rounded-md outline-0"
            type="submit"
            value="Add"
          />
          <span className="bg-zinc-500 w-fit h-fit p-1 px-5 text-xs text-white rounded-md outline-0">
            Close
          </span>
        </span>
      </form>
    </div>
  );
};

export default AddTask;
