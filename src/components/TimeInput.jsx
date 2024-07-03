import React, { useState } from "react";

const TimeInput = ({
  handleTime,
  setValue
}) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [error, setError] = useState("");
const validInput = (val) => {
    return val.replace(/[^0-9]+/g, "");
  };
  const setMax = (id) => {
    if (id === "hours") return 23;
    return 59;
  };

  const throwErr = (mssg, invalid = false) => {
    if (invalid) {
      setError(mssg);
    } else {
      setError("");
    }
  };
  const handleKeyUp = (e, setter, id) => {
    let val = e.target.value;
    val = validInput(val);
    val = val.length > 2 ? val.substring(0, 2) : val;

    let max = setMax(id);

    if (+val > max) {
      throwErr(`At max ${max} ${id}`, true);
    } else {
      throwErr("");
    }

    setter(val);
  };
  return (
    <div>
      <div className="flex items-center text-md bg-white overflow-hidden rounded-md bg p-1 relative">
        <label className="relative">
          <input
            placeholder="hh"
            type="number"
            id="hours"
            value={setValue("hour")}
            onKeyUp={(e) => handleKeyUp(e, setHours, "hours")}
            onChange={(e) => {
              // validInputSetter(e,"hour")
              // setHours(validInput(e.target.value));
              handleTime(e, "hour");
            }}
            className="w-10 text-center outline-none"
          />
        </label>
        <span>:</span>
        <label className="relative">
          <input
            placeholder="mm"
            type="number"
            id="minutes"
            value={setValue("minute")}
            onKeyUp={(e) => handleKeyUp(e, setMinutes, "minutes")}
            onChange={(e) => {
              // validInputSetter(e, "minute");
              // setMinutes(validInput(e.target.value));
              handleTime(e, "minute");
            }}
            className="w-10 text-center outline-none  "
          />
        </label>
      </div>
      <div
        className={`absolute bottom-0 right-0 p-3 sm:bottom-[32%] sm:right-[40%] text-red-600 ${
          error ? "block" : "hidden"
        }`}
      >
        {error}
      </div>
    </div>
  );
};

export default TimeInput;
