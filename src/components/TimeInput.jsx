import React, { useState } from "react";
import { GrFormClock } from "react-icons/gr";

const TimeInput = ({ timeInputHandler, assignTimeValue, errHandle }) => {
  const [pick, setPick] = useState(false);
  const {setError, act}= errHandle;
  return (
    <div className="wrapper w-28 relative">
      <div className={`w-full overflow-hidden rounded-md border-[1px] border-zinc-200 flex gap-[.1px]`}>
        <div className={`time w-[95%] h-5 flex justify-between items-center relative bg-white`}>
          <input
            autoFocus
            type="number"
            className={`w-[45%] h-full text-center text-sm px-1 outline-none`}
            name="hour"
            placeholder="hh"
            value={assignTimeValue("hours")}
            onChange={(e) => {
              let val = e.target.value;
              Number(val) <= 23 && timeInputHandler(val, "hours");
            }}
            min="0"
            max="23"
          />
          <span className="absolute font-bold left-1/2 -translate-x-1/2 text-xs">
            :
          </span>
          <input
            type="number"
            className={`w-[45%] h-full text-center text-sm px-1 outline-none`}
            name="minute"
            placeholder="mm"
            value={assignTimeValue("minutes")}
            onChange={(e) => {
              let val = e.target.value;
              Number(val) <= 59 && timeInputHandler(val, "minutes");
            }}
            min="0"
            max="59"
          />
        </div>
        <span
          onClick={() => setPick(!pick)}
          className="flex items-center bg-zinc-300 cursor-pointer"
        >
          <GrFormClock />
        </span>
      </div>
      <div
        className={`picker bg-zinc-400 w-[85%] flex gap-[1px] absolute transition-all origin-top  z-[2] ${
          pick ? "scale-y-1" : "scale-y-0"
        }`}
      >
        <div className="pick-hours w-1/2 h-44 overflow-y-auto bg-white flex flex-col items-center ">
          {Array.from({ length: 24 }, (_, i) => i).map((h, i) => (
            <span
              className="w-full text-center cursor-pointer mb-3 hover:bg-zinc-200"
              key={i}
              onClick={() => {
                timeInputHandler(h.toString(), "hours");
              }}
            >
              {h}
            </span>
          ))}
        </div>
        <div className="pick-minutes w-1/2 h-44 overflow-y-auto bg-white flex flex-col items-center">
          {Array.from({ length: 60 }, (_, i) => i).map((m, i) => (
            <span
              className="w-full text-center cursor-pointer mb-3 hover:bg-zinc-200"
              key={i}
              onClick={() => {
                timeInputHandler(m.toString() , "minutes")
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeInput;
