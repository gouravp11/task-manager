import React, { useContext } from 'react'
import { appContext } from '../utils/context';
import { RiArrowDropDownLine } from 'react-icons/ri';

const TaskNav = () => {
    const {navToggle, setNavToggle} = useContext(appContext);
  return (
    <div className={`w-full h-10 mt-5 sm:mt-2 transition-all bg-zinc-200 opacity-1 ${
        navToggle ? "translate-y-[125%]" : "translate-y-0"
      } lg:w-1/2 sm:bg-zinc-200 rounded-t-md flex justify-between items-center px-3`}>
    <h1 className="font-bold">
      Today's Tasks:
    </h1>
  </div>
  )
}

export default TaskNav
