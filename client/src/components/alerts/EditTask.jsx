"use client";
import {  updateTask } from "@/app/api/route";
import { FlagIcon } from "@heroicons/react/24/outline";
import moment from "moment/moment";
import { useState } from "react";

const EditTask = ({ task, cancelEditTask }) => {
  const date = moment(task?.taskDate || "");
  const [tasks, setTasks] = useState([]);
  const taskId = task?._id;
  const deadline = moment(task?.deadline);
  const [taskDate, setTaskDate] = useState(date.format("YYYY-MM-DD"));
  const [taskTitle, setTaskTitle] = useState(task?.title || "");
  const [taskDescription, setTaskDescription] = useState(
    task?.description || ""
  );
  const [taskPriority, setTaskPriority] = useState(task?.priority || "");
  const [taskStatus, setTaskStatus] = useState(task?.status || "");
  const [taskDeadline, setTaskdeadline] = useState(
    deadline.format("YYYY-MM-DD")
  );
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if(taskId){
        console.log(taskId);
    const data = {
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      status: taskStatus,
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
    };
    try {
      const result = await updateTask(taskId, data);
      const temTasks = [result, ...tasks];
      setTasks(temTasks);
      console.log(result);
      setTaskTitle(task?.title || "");
      setTaskDescription(task?.description || "");
      setTaskPriority(task?.priority || "");
      setTaskStatus(task?.status || "");
      setTaskdeadline(deadline.format("YYYY-MM-DD"));
      setTaskDate(date.format("YYYY-MM-DD"));
    } catch (error) {
      console.log("Error al actualizar la tarea:", error);
    }}
  };
 

  return (
    <div>
      {/* <div className="bg-black opacity-50 fixed left-0 top-0 w-screen h-screen"></div> */}
      <form
        id="EditForm"
        onSubmit={handleSubmit}
        className=" rounded-lg px-4 py-3 text-sm bg-white  tracking-wider  w-[250px] absolute top-30 left-96 z-50 h-fit shadow-lg border-2 border-gray-800"
      >
        <div>
          <input
            type="text"
            className="block outline-none text-xl mt-2"
            placeholder="Nombre de la tarea"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            type="text"
            className=" outline-none text-md mt-2"
            placeholder="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <div>
          <div className="mt-2 ">
            <div>
              <label>Task Date </label>
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
            <div className="pt-2">
              <label>Deadline</label>
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
          <div className="flex fonline-none m-3 focus: border-black">
            <div >
              <label>Priority</label>
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
            <div>
                <label>Status</label>
              <select
                className="px-2 py-2"
                type="text"
                onChange={(e) => setTaskStatus(e.target.value)}
                value={taskStatus}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 w-full">
            <button
              className="fondo-gris p-2 rounded-lg texto-gris-1 shadow-lg"
              onClick={() => cancelEditTask()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="fondo-rojo p-2 rounded-lg text-white shadow-lg"
              onClick={() => handleSubmit()}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
