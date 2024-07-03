import React, { useContext } from "react";
import Nav from "./components/Nav";
import Tasks from "./components/Tasks";
import { appContext } from "./utils/context";
import TaskNav from "./components/TaskNav";
import AddTask from "./components/AddTask";
import TimeInput from "./components/TimeInput";

const App = () => {
  const {navToggle, setNavToggle} = useContext(appContext);
  return (
    <div className="container w-[90%] mx-auto h-screen min-h-screen font-[Poppins] flex flex-col items-center relative">
      <Nav />
      <TaskNav/>
      <Tasks />
    </div>
  );
};

export default App;
