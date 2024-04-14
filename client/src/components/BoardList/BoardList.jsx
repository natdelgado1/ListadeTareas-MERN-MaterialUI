"use client";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme";
import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import { blue } from "@mui/material/colors";

import {
  AddCircleOutline,
  AddOutlined,
  AssignmentTurnedInOutlined,
  AutorenewOutlined,
  Brightness1,
  Brightness1Rounded,
  CheckBox,
  CheckBoxOutlineBlank,
  CheckBoxOutlineBlankOutlined,
  DescriptionOutlined,
  EditCalendarOutlined,
  ListSharp,
  PlusOneOutlined,
  PriorityHighOutlined,
  ScheduleOutlined,
} from "@mui/icons-material";
import { findAllTasks, updateStatus } from "@/app/api/route";

const BoardList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(false);

  const date = new Date();

  const [taskDate, setTaskDate] = useState(date.toISOString().substring(0,10));
  date.setDate(date.getDate()+1);
  const [taskDeadline, setTaskdeadline] = useState(date.toISOString().substring(0,10));

  const fetchAllTasks = () => {
    findAllTasks()
      .then((allTasks) => {
        setTasks(allTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeStatus = (task) => {
    console.log(task);
    let newStatus = "completed";
    if (task.status === "completed") {
      newStatus = "pending";
    }
    updateStatus(task._id, { status: newStatus }).then((updatedTask) => {
      console.log(updatedTask);
      const newList = tasks.filter((t) => {
        return t._id !== task._id;
      });
      setTasks([...newList, updatedTask]);
    });
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Fab
      onClick={(e)=>setNewTask(!newTask)}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          bgcolor: blue[500],
        }}
        aria-label={"Add task"}
        color={"primary"}
      >
        <AddOutlined /> 
      </Fab>
      <table className="w-full border-collapse border border-gray-200 m-2 text-[#4D4D4D] p-2">
        <thead>
          <tr className="text-left">
            <th className="border border-gray-200 px-2 py-2 font-normal">
              {<AssignmentTurnedInOutlined className="w-5" />}Task
            </th>
            <th className="border border-gray-200 px-2 py-2 font-normal">
              {<DescriptionOutlined className="w-5" />} Description
            </th>
            <th className="border border-gray-200 px-2 py-2 font-normal">
              {<PriorityHighOutlined className="w-5" />}Priority
            </th>
            <th className="border border-gray-200 px-2 py-2 font-normal">
              {<AutorenewOutlined className="w-5" />}Status
            </th>
            <th className="border border-gray-200 px-2 py-2 font-normal">
              {<EditCalendarOutlined className="w-5" />}Task Date
            </th>
            <th className="border border-gray-200 px-2 py-2 font-normal">
              {<ScheduleOutlined className="w-5" />}Deadline
            </th>
          </tr>
        </thead>
        <tbody>
          {newTask === true && (
            <tr className="shadow-lg ">
              <td className="border border-gray-200 ">
                <input className="px-2 py-2 w-full" type="text" placeholder="Titulo de la tarea"/>
              </td>
              <td className="border  border-gray-200 ">
                <input className="px-2 py-2 w-full" type="text" placeholder="Descripcion de la tarea"/>
              </td>
              <td className="border  border-gray-200 ">
                <select className="px-2 py-2 w-full" type="text" defaultValue={'low'}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td className="border  border-gray-200 ">
                <select className="px-2 py-2 w-full" type="text" defaultValue={'pending'}>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td className="border  border-gray-200">
                <input className="px-2 py-2 w-full" type="date" value={taskDate} onChange={(e)=>setTaskDate(e.target.value)}/>
                {/* <input className="px-2 py-2 w-full" type="time"/> */}
              </td>
              <td className="border  border-gray-200">
              <input className="px-2 py-2 w-full" type="date" value={taskDeadline} onChange={(e)=>setTaskdeadline(e.target.value)}/>
                {/* <input className="px-2 py-2 w-full" type="time"/> */}
              </td>
            </tr>
          )}
          {tasks.map(
            (task, index) =>
              task.status === "pending" && (
                <tr key={index}>
                  <td className="border flex gap-3 border-gray-200 px-4 py-2">
                    <button onClick={() => handleChangeStatus(task)}>
                      <CheckBoxOutlineBlankOutlined />
                    </button>
                    <span>{task.title}</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {task.description}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {task.priority}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 flex justify-between">
                    {task.status.toUpperCase()}
                    <Brightness1 className="text-yellow-500" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {task.taskDate}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {task.deadline}
                  </td>
                </tr>
              )
          )}
          {tasks.map(
            (task, index) =>
              task.status === "completed" && (
                <tr key={index}>
                  <td className="border flex gap-3 border-gray-200 px-4 py-2">
                    <button onClick={() => handleChangeStatus(task)}>
                      <CheckBox />
                    </button>

                    <span>{task.title}</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {task.description}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {task.priority}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 flex justify-between">
                    {task.status.toUpperCase()}
                    <Brightness1 className="text-green-600" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {task.taskDate}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {task.deadline}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>

      <TodoForm setTasks={setTasks} />
      <TodoList tasks={tasks} setTasks={setTasks} />
    </ThemeProvider>
  );
};
export default BoardList;
