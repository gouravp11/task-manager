import React, { useContext, useState } from "react";
import { appContext } from "../utils/context";
import TimeInput from "./TimeInput";

const AddTask = () => {
  const { tasks, setTasks } = useContext(appContext);
  const { addTask, setAddTask } = useContext(appContext);
  const validateTime = (time) => {
    const timeFormat = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    if (!timeFormat.test(time)) {
      console.log("Invalid time format. Please enter time as hh:mm AM/PM");
      return false;
    }
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
  const handleTime = (e, action, timePeriod) => {
    // console.log(formData.starttime)
    if (action === "hour") {
      if (timePeriod == "start")
        setFormData({
          ...formData,
          starttime: { ...formData.starttime, hour: e.target.value },
        });
      else if (timePeriod == "end")
        setFormData({
          ...formData,
          endtime: { ...formData.endtime, hour: e.target.value },
        });
      // console.log(formData);
    } else if (action === "minute") {
      if (timePeriod == "start")
        setFormData({
          ...formData,
          starttime: { ...formData.starttime, minute: e.target.value },
        });
      else if (timePeriod == "end")
        setFormData({
          ...formData,
          endtime: { ...formData.endtime, minute: e.target.value },
        });
      // console.log(formData);
    }
  };
  const addTaskToggler = () => {
    setAddTask(!addTask);
  };
  const inputTimeValueSetter = (action, timePeriod) => {
    if (action === "hour") {
      if (timePeriod == "start") return formData.starttime.hour;
      else if (timePeriod == "end") return formData.endtime.hour;
    } else if (action === "minute") {
      if (timePeriod == "start") return formData.starttime.minute;
      else if (timePeriod == "end") return formData.endtime.minute;
    }
  };
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
            setFormData={setFormData}
            handleTime={handleTime}
            timePeriod="start"
            inputTimeValueSetter={inputTimeValueSetter}
          />
          <span>-</span>
          <TimeInput
            setFormData={setFormData}
            handleTime={handleTime}
            timePeriod="end"
            inputTimeValueSetter={inputTimeValueSetter}
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
