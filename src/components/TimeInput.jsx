import React, { useState } from "react";

const TimeInput = ({
  setFormData,
  handleTime,
  timePeriod,
  inputTimeValueSetter,
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
      e.target.classList.add("invalid");
    } else {
      throwErr("");
      e.target.classList.remove("invalid");
    }

    setter(val);
  };
  const validInputSetter = (e, action) => {
    if (action === "hour") {
      if (timePeriod == "start")
        setFormData((prev) => ({
          ...prev,
          starttime: { ...prev.starttime, hour: validInput(e.target.value) },
        }));
      else if (timePeriod == "end")
        setFormData((prev) => ({
          ...prev,
          endtime: { ...prev.endtime, hour: validInput(e.target.value) },
        }));
    } else if (action === "minute") {
      if (timePeriod == "start")
        setFormData((prev) => ({
          ...prev,
          starttime: { ...prev.starttime, minute: validInput(e.target.value) },
        }));
      else if (timePeriod == "end")
        setFormData((prev) => ({
          ...prev,
          endtime: { ...prev.endtime, minute: validInput(e.target.value) },
        }));
    }
  };
  return (
    <div>
      <div className="flex items-center text-md bg-white overflow-hidden rounded-md bg p-1 relative">
        <label className="relative">
          <input
            placeholder="hh"
            type="number"
            id="hours"
            value={hours}
            onKeyUp={(e) => handleKeyUp(e, setHours, "hours")}
            onChange={(e) => {
              // validInputSetter(e,"hour")
              setHours(validInput(e.target.value));
              setFormData((prev) => ({ ...prev }));
              handleTime(e, "hour", timePeriod);
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
            value={inputTimeValueSetter("minute", timePeriod)}
            onKeyUp={(e) => handleKeyUp(e, setMinutes, "minutes")}
            onChange={(e) => {
              validInputSetter(e, "minute");
              setMinutes(validInput(e.target.value));
              handleTime(e, "minute", timePeriod);
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
