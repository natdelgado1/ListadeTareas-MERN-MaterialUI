"use client";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme";
import { useContext, useEffect, useState } from "react";
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
  SaveAlt,
  ScheduleOutlined,
  Settings,
  SaveAltOutlined,
  SaveOutlined,
  Edit,
  EditOutlined,
  DeleteOutline,
  Visibility,
} from "@mui/icons-material";
import {
  createTask,
  findAllTasks,
  findfilterTask,
  updateStatus,
} from "@/app/api/route";
import moment from "moment/moment";
import { FilterContext } from "@/context/FilterContext";

const BoardList = ({ addNewTask }) => {
  const date = moment();
  const { updateFilters, filters } = useContext(FilterContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(addNewTask || false);
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

  const fetchAllTasks = () => {
    findfilterTask(filters)
      .then((allTasks) => {
        setTasks(allTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTaskCreation = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(taskDate.split("-")[1]);
    if (user) {
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
        setNewTask(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await handleTaskCreation();
    }
  };

  const handleChangeStatus = (task) => {
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
  }, [filters]);

  useEffect(() => {}, [newTask]);
  return (
    <ThemeProvider theme={theme}>
      <Fab
        onClick={(e) => setNewTask(!newTask)}
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
      <table className="w-full border-collapse border border-gray-200 text-[#4D4D4D] py-2">
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
            <th className="border text-center border-gray-200 px-2 py-2 font-normal">
              {<Settings className="w-5" />}
            </th>
          </tr>
        </thead>
        <tbody>
          {newTask === true && (
            <tr className="shadow-lg ">
              <td className="border border-gray-200 ">
                <input
                  className="px-2 py-2 w-full"
                  type="text"
                  placeholder="Titulo de la tarea"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </td>
              <td className="border  border-gray-200 ">
                <input
                  className="px-2 py-2 w-full"
                  type="text"
                  placeholder="Descripcion de la tarea"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </td>
              <td className="border  border-gray-200 ">
                <select
                  className="px-2 py-2 w-full"
                  type="text"
                  onChange={(e) => setTaskPriority(e.target.value)}
                  value={taskPriority}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td className="border  border-gray-200 ">
                <select
                  className="px-2 py-2 w-full"
                  type="text"
                  onChange={(e) => setTaskStatus(e.target.value)}
                  value={taskStatus}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td className="border  border-gray-200">
                <input
                  className="px-2 py-2 w-full"
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                />
                {/* <input className="px-2 py-2 w-full" type="time"/> */}
              </td>
              <td className="border  border-gray-200">
                <input
                  className="px-2 py-2 w-full"
                  type="date"
                  value={taskDeadline}
                  onChange={(e) => setTaskdeadline(e.target.value)}
                />
                {/* <input className="px-2 py-2 w-full" type="time"/> */}
              </td>
              <td className="text-center text-blue-600">
                <button onClick={() => handleTaskCreation()}>
                  <SaveOutlined />
                </button>
              </td>
            </tr>
          )}
          {tasks.map((group, index) =>
            group.tasks.map(
              (task, index) =>
                task.status === "pending" && (
                  <tr key={index}>
                    <td className="border  border-gray-200 px-4 py-2">
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
                      {moment(task.taskDate).format("DD-MM-YYYY")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {moment(task.deadline).format("DD-MM-YYYY")}
                    </td>

                    <td className="text-center">
                      <div className="flex gap-2 items-center justify-center">
                        <button
                          title="Ver tarea"
                          className="hover:text-blue-500"
                        >
                          <Visibility className="w-5 h-5" />
                        </button>
                        <button className="hover:text-blue-500">
                          <EditOutlined className="w-5 h-5" />
                        </button>
                        <button className="hover:text-blue-500">
                          <DeleteOutline className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
            )
          )}

          {tasks.map((group, index) =>
            group.tasks.map(
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
                    {moment(task.deadline).format("DD-MM-YYYY")}
                    </td>
                    <td className="text-center">
                      <div className="flex gap-2">
                        <button className="w-4 h-4">
                          <EditOutlined />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
            )
          )}
        </tbody>
      </table>
    </ThemeProvider>
  );
};
export default BoardList;
