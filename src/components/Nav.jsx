import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../utils/context";

const Nav = () => {
  const { addTask, setAddTask } = useContext(appContext);
  const addTaskToggler = () => {
    setAddTask(!addTask);
  };
  return (
    <div
      id="navbar"
      className={`container mx-auto w-full bg-zinc-100 rounded-b-md p-4 flex justify-between items-center relative`}
    >
      <button
        onClick={addTaskToggler}
        className={`text-sm sm:text-md font-bold p-1 px-4 rounded-md transition-all outline-0`}
      >
        + Add task
      </button>
      <div className="flex gap-3">
        <button className="w-8 h-5 sm:p-1 sm:px-3 sm:h-fit sm:w-fit text-zinc-50 font-semibold text-xs rounded-full bg-green-500">
          <span className="hidden sm:inline-block">Low</span>
        </button>
        <button className="w-8 h-5 sm:p-1 sm:px-3 sm:h-fit sm:w-fit text-zinc-50 font-semibold text-xs rounded-full bg-yellow-500">
          <span className="hidden sm:inline-block">Med</span>
        </button>
        <button className="w-8 h-5 sm:p-1 sm:px-3 sm:h-fit sm:w-fit text-zinc-50 font-semibold text-xs rounded-full bg-red-500">
          <span className="hidden sm:inline-block">High</span>
        </button>
      </div>
    </div>
  );
};

export default Nav;
