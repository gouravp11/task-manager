import React, { createContext, useState } from 'react'
export const appContext= createContext();
const Context = (props) => {
    const [tasks, setTasks] = useState([]);
    const [navToggle, setNavToggle] = useState(false);
    const [addTask, setAddTask] = useState(false);
  return (
    <appContext.Provider value={{navToggle, setNavToggle,addTask,setAddTask,tasks,setTasks}}>
        {props.children}
    </appContext.Provider>
  )
}

export default Context
