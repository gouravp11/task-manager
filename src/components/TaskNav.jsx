import React, { useContext } from "react";
import { appContext } from "../utils/context";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const TaskNav = () => {
  const { switchDate, setSwitchDate } = useContext(appContext);
  const currentDate = new Date();
  const {search}=useLocation();
  const day= search? Number(search.split("&")[1]): currentDate.getDate(); 
  const formatDate = (date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" }); // "Mon"
    const day = date.toLocaleDateString("en-US", { day: "numeric" }); // "5"
    const month = date.toLocaleDateString("en-US", { month: "long" }); // "July"
    return `${dayName} ${day} ${month}`;
  };
  const weekDates = [];
  const weekDatesGenerator = () => {
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      let date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      weekDates.push(date);
    }
  };
  weekDatesGenerator();
  const toggleDateSwitcher = () => {
    setSwitchDate(!switchDate);
  };
  return (
    <div
      className={`w-full h-10 mt-5 sm:mt-2 transition-all bg-zinc-200 opacity-1 lg:w-1/2 sm:bg-zinc-200 rounded-t-md flex justify-between items-center px-3 relative z-[1]`}
    >
      <h1 className="font-bold">Today's Tasks:</h1>
      <div className="w-fit pt-3 bg-zinc-200 flex flex-col items-center z-[-1] absolute top-0 right-[2%] rounded-b-md overflow-hidden">
        <button
          onClick={toggleDateSwitcher}
          className="h-fit text-zinc-50 font-semibold text-xs text-zinc-600 underline outline-none"
        >
          <span className="flex items-center">
            Add task for another day
            <span className={`${switchDate === false ? "inline" : "hidden"}`}>
              <RiArrowDropDownLine size={20} />
            </span>
            <span className={`${switchDate === true ? "inline" : "hidden"}`}>
              <RiArrowDropUpLine size={20} />
            </span>
          </span>
        </button>
        <div
          className={`w-full text-center p-2 flex flex-col z-[1] bg-zinc-500 text-white ${
            switchDate ? "inline-block" : "hidden"
          }`}
        >
          {weekDates.map((date, i) => (
            <Link
              onClick={toggleDateSwitcher}
              className={`mb-2 hover:bg-zinc-300 hover:text-zinc-500 ${day===date.getDate() && "bg-zinc-300 text-zinc-500"}`}
              to={`/${
                currentDate.getTime() == date.getTime()
                  ? ""
                  : "?day&" +
                    date.toLocaleDateString("en-US", { day: "numeric" })
                    + "&" + i
              }`}
              key={i}
            >
              {currentDate.getTime() == date.getTime()
                ? "Today"
                : formatDate(date)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskNav;
