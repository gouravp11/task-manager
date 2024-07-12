import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../utils/context";
import TimeInput from "./TimeInput";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";

const AddTask = () => {
  const { tasks, setTasks } = useContext(appContext);
  const { addTask, setAddTask } = useContext(appContext);
  const { search } = useLocation();
  const [formData, setFormData] = useState({
    taskId: nanoid(),
    title: "",
    starttime: { starthour: "", startminute: "" },
    endtime: { endhour: "", endminute: "" },
    description: "",
    date: ""
  });
  useEffect(() => {
    const date = new Date(new Date());
    const dateFactor = search ? Number(search.split("&")[2]) : 0;
    date.setDate(date.getDate() + dateFactor);

    if (dateFactor !== 0) {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      date: date
    }));
  }, [search]);
  const startTimeHandler = (val, act) => {
    act == "hours"
      ? setFormData((prev) => ({
          ...prev,
          starttime: {
            ...prev.starttime,
            starthour: val.length > 2 ? val.substring(0, 2) : val,
          },
        }))
      : setFormData((prev) => ({
          ...prev,
          starttime: {
            ...prev.starttime,
            startminute: val.length > 2 ? val.substring(0, 2) : val,
          },
        }));
  };
  const endTimeHandler = (val, act) => {
    act == "hours"
      ? setFormData((prev) => ({
          ...prev,
          endtime: {
            ...prev.endtime,
            endhour: val.length > 2 ? val.substring(0, 2) : val,
          },
        }))
      : setFormData((prev) => ({
          ...prev,
          endtime: {
            ...prev.endtime,
            endminute: val.length > 2 ? val.substring(0, 2) : val,
          },
        }));
  };
  const assignStartTimeValue = (act) =>
    act === "hours"
      ? formData.starttime.starthour
      : formData.starttime.startminute;
  const assignEndTimeValue = (act) =>
    act === "hours" ? formData.endtime.endhour : formData.endtime.endminute;
  const [error, setError] = useState({
    title: false,
    starttime: false,
    endtime: false,
    description: false,
  });
  const addTaskToggler = () => {
    setAddTask(!addTask);
  };
  const checkConditions = () => {
    const { title, description, starttime, endtime, date } = formData;
    const { starthour, startminute } = starttime;
    const { endhour, endminute } = endtime;
    const conditions = [
      {
        name: "isTitleTooShort",
        condition: title.trim().length < 3,
        errorKey: "title",
      },
      {
        name: "isDescriptionTooShort",
        condition: description.trim().length < 3,
        errorKey: "description",
      },
      {
        name: "isStartHourEmpty",
        condition: starthour.trim().length < 1,
        errorKey: "starttime",
      },
      {
        name: "isStartMinuteEmpty",
        condition: startminute.trim().length < 1,
        errorKey: "starttime",
      },
      {
        name: "isEndHourEmpty",
        condition: endhour.trim().length < 1,
        errorKey: "endtime",
      },
      {
        name: "isEndMinuteEmpty",
        condition: endminute.trim().length < 1,
        errorKey: "endtime",
      },
      {
        name: "isStartHourInvalid",
        condition: Number(starthour) > 23,
        errorKey: "starttime",
      },
      {
        name: "isEndHourInvalid",
        condition: Number(endhour) > 23,
        errorKey: "endtime",
      },
      {
        name: "isStartMinuteInvalid",
        condition: Number(startminute) > 59,
        errorKey: "starttime",
      },
      {
        name: "isEndMinuteInvalid",
        condition: Number(endminute) > 59,
        errorKey: "endtime",
      },
      {
        name: "isStartHourGreaterThanEndHour",
        condition: Number(starthour) > Number(endhour),
        errorKey: "starttime",
      },
      {
        name: "isStartHourLessThanCurrent",
        condition: Number(starthour) < date.getHours(),
        errorKey: "starttime",
      },
      {
        name: "isEndHourLessThanCurrent",
        condition: Number(endhour) < date.getHours(),
        errorKey: "endtime",
      },
      {
        name: "isStartHourEqualToEndHourAndStartMinuteGreaterThanEndMinute",
        condition:
          Number(starthour) === Number(endhour) &&
          Number(startminute) > Number(endminute),
        errorKey: "starttime",
      },
    ];

    const failedConditions = conditions.filter(
      (condition) => condition.condition
    );
    if (failedConditions.length > 0) {
      // console.log(
      //   "Failed conditions:",
      //   failedConditions.map((condition) => condition.name)
      // );

      const newErrorState = {
        title: false,
        starttime: false,
        endtime: false,
        description: false,
      };
      failedConditions.forEach((condition) => {
        newErrorState[condition.errorKey] = true;
      });
      setError(newErrorState);
    } else {
      console.log("All conditions are met");
      setError({
        title: false,
        starttime: false,
        endtime: false,
        description: false,
      });
      
      setTasks([...tasks, formData]);
      setFormData((prev) => ({
        ...prev,
        taskId: nanoid(),
        title: "",
        starttime: { ...starttime, starthour: "", startminute: "" },
        endtime: { ...endtime, endhour: "", endminute: "" },
        description: ""
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    checkConditions();
  };

  return (
    <div
      className={`w-full bg-zinc-200 rounded-md relative p-3 mb-5 ${
        addTask ? "block" : "hidden"
      }`}
    >
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          className={`mb-1 w-full rounded-md outline-0 text-sm p-1 ${
            error.title ? "bg-red-200" : ""
          }`}
          type="text"
          placeholder="title"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            e.target.value.length > 2 && setError({ ...error, title: false });
          }}
          autoFocus
        />
        <div className="time flex flex-col sm:flex-row sm:items-center gap-2 text-sm my-1 relative">
          <div
            className={`w-fit rounded-md flex items-center px-1 py-[2px] ${
              error.starttime ? "bg-red-200" : "bg-white"
            }`}
          >
            <span className="mr-5 text-zinc-400">from:</span>
            <TimeInput
              timeInputHandler={startTimeHandler}
              assignTimeValue={assignStartTimeValue}
              errHandle={{ setError, act: "start" }}
            />
          </div>

          <div
            className={`w-fit rounded-md flex items-center px-1 py-[2px] ${
              error.endtime ? "bg-red-200" : "bg-white"
            }`}
          >
            <span className="mr-5 text-zinc-400">to:</span>
            <TimeInput
              timeInputHandler={endTimeHandler}
              assignTimeValue={assignEndTimeValue}
              errHandle={{ setError, act: "end" }}
            />
          </div>
          <span className="italic ml-2 text-xs absolute right-0 top-1/2 sm:left-[60%] -translate-y-1/2 ">
            0-24 hr format
          </span>
        </div>
        <input
          className={`w-full mt-1 rounded-md outline-0 text-sm p-1 sm:w-[70%] ${
            error.description ? "bg-red-200" : ""
          }`}
          type="text"
          placeholder="description"
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
            e.target.value.length > 2 &&
              setError({ ...error, description: false });
          }}
        />
        <span className="mt-2 flex gap-1 sm:p-3 sm:m-0 sm:absolute bottom-0 right-0 cursor-pointer">
          <input
            className="bg-blue-500 w-fit h-fit p-1 px-5 text-xs text-white rounded-md outline-0 cursor-pointer"
            type="submit"
            value="Add"
          />
          <span
            onClick={addTaskToggler}
            className="bg-zinc-500 w-fit h-fit p-1 px-5 text-xs text-white rounded-md outline-0"
          >
            Close
          </span>
        </span>
      </form>
    </div>
  );
};

export default AddTask;
