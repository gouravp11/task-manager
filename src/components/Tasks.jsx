import React, { useContext } from 'react'
import Task from './Task'
import { appContext } from '../utils/context'
import AddTask from './AddTask'

const Tasks = () => {
    const {tasks, setTasks}= useContext(appContext);
    const{navToggle, setNavToggle}= useContext(appContext)
  return (
    <div className={`container p-3 w-full h-[83%] rounded-b-md mt-2 sm:mt-0 h-[80%] sm:border-y-8 border-zinc-100 lg:w-[50%] sm:bg-zinc-100 overflow-y-auto transition-all ${navToggle? "translate-y-[6.5%] h-[77%]": "translate-y-0"} `}>
        <AddTask/>
        {tasks.map((task, index) => (
            <Task key={index} task={task} index={index}/>
        ))}
    </div>
  )
}

export default Tasks
