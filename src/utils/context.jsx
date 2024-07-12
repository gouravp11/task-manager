import React, { createContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
export const appContext= createContext();
const Context = (props) => {
    const [tasks, setTasks] = useState([]);
    const [navToggle, setNavToggle] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [switchDate, setSwitchDate] = useState(false);
  return (
    <appContext.Provider value={{navToggle, setNavToggle,addTask,setAddTask,tasks,setTasks, switchDate, setSwitchDate}}>
        {props.children}
    </appContext.Provider>
  )
}

export default Context
