import React, { useContext, useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { appContext } from "../utils/context";

const Nav = () => {
  const{navToggle, setNavToggle}= useContext(appContext)
  window.addEventListener("resize",()=>{
    if(window.innerWidth==640) setNavToggle(false)
  });
  const navToggler = () => {
    setNavToggle(!navToggle);
  };
  const{addTask, setAddTask} = useContext(appContext)
  const addTaskToggler= ()=>{
    setAddTask(!addTask);
  }
  return (
    <div
      id="navbar"
      className={`container mx-auto w-full bg-zinc-100 rounded-b-md p-4 flex justify-between items-center relative $`}
    >
      <button onClick={addTaskToggler} className={`text-sm sm:text-md font-bold p-1 px-4 rounded-md transition-all outline-0`}>+ Add task</button>
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
      <span onClick={navToggler} className="sm:hidden cursor-pointer">
        <IoIosMenu size={30} />
      </span>
      <div
        className={`w-full h-full pb-3 pr-[10%] absolute right-0 z-[-1] rounded-b-md flex justify-end items-end sm:static sm:w-fit sm:h-fit sm:z-0 sm:p-0 bg-zinc-100  transition-all transition-200 ${
          navToggle===true? "translate-y-[80%]":"translate-y-0"
        }`}
      >
        <button className="p-1 px-3 h-fit text-zinc-50 font-semibold text-xs text-zinc-600 rounded-full border-zinc-500 border-2 self-right">
          Switch to another day
        </button>
      </div>
    </div>
  );
};

export default Nav;
