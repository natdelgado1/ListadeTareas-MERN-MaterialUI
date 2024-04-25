import { Fragment } from "react";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import { findAllTasks } from "@/app/api/route";
import { useEffect } from "react";
import moment from "moment/moment";
import {
  DeleteRounded,
  EditRounded,
  ModeCommentRounded,
} from "@mui/icons-material";

const ListForm = () => {
  const [value, setValue] = useState("Hoy");
  const [tasks, setTasks] = useState([]);
  
  // const [taskDate, setTaskDate] = useState(date.format("YYYY-MM-DD"));
  // const [taskTitle, setTaskTitle] = useState("");
  // const [taskDescription, setTaskDescription] = useState("");
  // const [taskPriority, setTaskPriority] = useState("low");
  // const [taskStatus, setTaskStatus] = useState("pending");
  // const [taskDeadline, setTaskdeadline] = useState(
  //   `${date.year()}-${
  //     date.month() < 10 ? "0" + (date.month() + 1) : date.month() + 1
  //   }-${date.date() + 1}`
  // );
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const fetchAllTasks = () => {
    findAllTasks()
      .then((allTasks) => {
        setTasks(allTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAllTasks();
  }, []);
  return (
    <Fragment>
      <div className="relative ">
        <h1 className="text-[#4D4D4D] font-bold text-3xl">Hoy</h1>
        <h2 className="text-[#696666] absolute top-7 left-16 text-sm">
          Jueves • Abr 25
        </h2>
      </div>
      <hr className="mt-6" />
      {tasks.map((task, index) => (
        <div className="pt-2">
          <div className="flex py-1">
            <div className="p-4 max-w-xs  bg-white rounded-xl  flex-1 relative">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="checked-demo"
                  value="1"
                  class="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-[#9C27B0] checked:border-transparent focus:outline-none"
                />
                <span className="text-gray-900 font-medium text-xl">
                  {task.title}
                </span>
              </label>
              <span className="absolute top-10 left-14 text-sm text-[#696666]">
                {task.description}
              </span>
            </div>
            <div className="flex items-center flex-1 justify-end gap-2">
              <div className="rounded-lg h-3 w-3 bg-[#F44336]"></div>
              <EditRounded className="text-[#4D4D4D] w-5 h-5" />
              <ModeCommentRounded className="text-[#4D4D4D] h-5 w-5" />
              <DeleteRounded className="text-[#4D4D4D] h-5 w-5" />
            </div>
          </div>
          <hr className="mt-4" />
        </div>
      ))}
    </Fragment>
  );
};

export default ListForm;
