"use client";
import { CalendarIcon, FlagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import moment from "moment/moment";
import { createTask } from "@/app/api/route";

const NewTaskAlert = ({showNewTask, cancelNewTask}) => {
  const date = moment();
  const [tasks, setTasks] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [taskDate, setTaskDate] = useState(date.format("YYYY-MM-DD"));
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("low");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [taskDeadline, setTaskdeadline] = useState(
    `${date.year()}-${
      date.month() < 10 ? "0" + (date.month() + 1) : date.month() + 1
    }-${date.date() + 1}`
  );

  const handleTaskCreation = async () => {
    if (titleError) {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(taskDate.split("-")[1]);
      if (user) {
        const data = {
          title: taskTitle,
          description: taskDescription,
          priority: taskPriority,
          taskDate: moment().set({
            dates: taskDate.split("-")[2],
            months: parseInt(taskDate.split("-")[1]) - 1,
            y: taskDate.split("-")[0],
          }),
          deadline: moment().set({
            dates: taskDeadline.split("-")[2],
            months: parseInt(taskDeadline.split("-")[1]) - 1,
            y: taskDeadline.split("-")[0],
          }),
          userId: user._id,
        };
        try {
          const result = await createTask(data);
          const temTasks = [result, ...tasks];
          setTasks(temTasks);
          console.log(result);
          setTaskTitle("");
          setTaskDescription("");
          setTaskPriority("low");
          setTaskStatus("pending");
          setTaskdeadline(
            `${date.year()}-${
              date.month() < 10 ? "0" + (date.month() + 1) : date.month() + 1
            }-${date.date() + 1}`
          );
          setTaskDate(date.format("YYYY-MM-DD"));
        } catch (error) {
          console.log(error);
        }
      }
      setTitleError("");
    } else {
      setTitleError("Title is required");
    }
  };

  
  return (
    

        <div className=" rounded-lg px-4 py-3 text-sm bg-white  tracking-wider  w-[250px] absolute top-30 left-4 z-50 h-64 shadow-lg">
          <div>
            <input
              type="text"
              className="block outline-none text-xl mt-2"
              placeholder="Nombre de la tarea"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            {titleError && (
              <h1 className="border-l-2 bg-gray-300 border-l-red-700 px-2 py-1 mt-2">
                {titleError}
              </h1>
            )}
            <input
              type="text"
              className="block outline-none text-md mt-2"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div>
            <div className="mt-2 ">
              <div>
                <input
                  type="date"
                  className={`${
                    taskDate ? "text-black" : "text-white"
                  } w-full px-4 py-2 border rounded-md outline-none block `}
                  value={taskDate}
                  onChange={() => setTaskDate(e.target.value)}
                  placeholder="Date"
                />
              </div>
              <div>
                <input
                  type="date"
                  className={`${
                    taskDate ? "text-black" : "text-white"
                  } w-full px-4 py-2 border rounded-md outline-none block`}
                  value={taskDeadline}
                  onChange={(e) => setTaskdeadline(e.target.value)}
                  placeholder="Date"
                />
              </div>
            </div>
            <div className="online-none m-3 focus: border-black">
              <select
                type="text"
                onChange={(e) => setTaskPriority(e.target.value)}
                value={taskPriority}
              >
                <option value="low">
                  Low <FlagIcon />{" "}
                </option>
                <option value="medium">
                  Medium <FlagIcon />{" "}
                </option>
                <option value="high">
                  High <FlagIcon />{" "}
                </option>
              </select>
            </div>
            <div className="flex justify-end gap-2 w-full">
              <button className="fondo-gris p-2 rounded-lg texto-gris-1 shadow-lg"
              onClick={() => cancelNewTask()}
              >
                Cancel
              </button>
              <button
                className="fondo-rojo p-2 rounded-lg text-white shadow-lg"
                onClick={() => handleTaskCreation()}
              >
                Add task
              </button>
            </div>
          </div>
        </div>
      
    
  );
};

export default NewTaskAlert;
