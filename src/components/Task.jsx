import React, { useContext } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { appContext } from '../utils/context';

const Task = ({task, index}) => {
  const {setTasks} = useContext(appContext);
  const {title, starttime, endtime, description} = task;
  const handleDelete = (i)=>{
    setTasks(prev=>prev.filter((task,i)=>i!=index));
  }
  return (
    <div className='w-full bg-zinc-200 rounded-md relative p-3 mb-5 flex flex-col gap-2'>
        <div>
        <h1 className='font-bold leading-[18px]'>{title}</h1>
      <div className="time flex gap-2 text-sm font-bold opacity-80 mt-1">
      <h2>{starttime.hour + ":" + starttime.minute}</h2>
      <h2>-</h2>
      <h2>{endtime.hour + ":" + endtime.minute}</h2>
      </div>
      <p className='text-xs font-bold opacity-60 leading-[16px] mt-1'>{description}
      </p>
        </div>
        <div>
        <div className="prioritize flex gap-3 self-start sm:absolute top-0 right-0 sm:p-3">
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
        <span onClick={()=>handleDelete(index)} className='absolute bottom-0 right-0 p-3'>
        <MdDeleteOutline size={20} />
        </span>
        </div>
    </div>
  )
}

export default Task