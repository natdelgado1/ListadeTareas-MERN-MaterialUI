"use client";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme";
import { Fragment, useContext, useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import { blue } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";
import {
  AddOutlined,
  Brightness1,
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import {
  createTask,
  deleteTask,
  findfilterTask,
  findfilterTaskStatusinPending,
  updateStatus,
} from "@/app/api/route";
import moment from "moment/moment";
import { FilterContext } from "@/context/FilterContext";
import {
  Cog6ToothIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import EditTask from "../Modals/EditTask";
import { Snackbar } from "@mui/material";
import { useUser } from "@/context/UserContext";

const TableView = ({ addNewTask }) => {
  const { user } = useUser();

  const date = moment();
  const { updateFilters, filters } = useContext(FilterContext);
  const [tasks, setTasks] = useState([]);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [filteredTask, setFilteredTask] = useState([]);
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
  const[taskRemove, setTaskRemove] = useState(false);
  const[taskCreate, setTaskCreate] = useState(false);
  const fetchAllTasks = () => {
    findfilterTask(filters)
      .then((allTasks) => {
        setTasks(allTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchFilteredTasksStatus = () => {
    findfilterTaskStatusinPending(filters)
      .then((allTasks) => {
        setFilteredTask(allTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchFilteredTasksStatus();
  }, [filters]);
  useEffect(() => {
    fetchFilteredTasksStatus();
  }, []);

  const handleTaskCreation = async () => {
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
        fetchAllTasks();
        fetchFilteredTasksStatus();
        setTaskCreate(true);
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

  const handleChangeStatus = async (task) => {
    let newStatus = "completed";
    if (task.status === "completed") {
      newStatus = "pending";
    }
   await updateStatus(task._id, { status: newStatus })
    fetchAllTasks();
    fetchFilteredTasksStatus();
  };

  useEffect(() => {
    fetchAllTasks();
  }, [filters]);
  //Funciones para editar la tarea
  const editTask = () => {
    setShowEditTask(true);
  };
  const cancelEditTask = () => {
    setShowEditTask(false);
  };

  const toogleEditAlert = (task) => {
    setShowEditTask(!showEditTask);
    setSelectedTask(task);
  };
  //Funciones para eliminar la tarea
  const toogleDeleteTask = (task) => {
    setShowDeleteTask(!showDeleteTask);
    setSelectedTask(task);
  };

  const handleDelete = async (e) => {
    e?.preventDefault();
    if (selectedTask._id) {
      try {
        const result = await deleteTask(selectedTask._id);
        setTaskRemove(true);
        setShowDeleteTask(false);
        fetchAllTasks();
        fetchFilteredTasksStatus();
      } catch (error) {
        console.log("Error al eliminar la tarea:", error);
      }
    }
  };
  
  useEffect(() => {}, [newTask]);
  return  (
    <ThemeProvider theme={theme}>
      <Snackbar
          open={taskRemove}
          message="Task successfully eliminated!"
          autoHideDuration={2000}
          onClose={() => setTaskRemove(false)}
        />
      <Snackbar
          open={taskCreate}
          message="Successfully Created Task!"
          autoHideDuration={2000}
          onClose={() => setTaskCreate(false)}
        />
      <Fab
        onClick={(e) => setNewTask(!newTask)}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        aria-label={"Add task"}
        color={"primary"}
        className="purpleButton"
      >
        <AddOutlined />
      </Fab>
      <div className="max-lg:overflow-x-scroll max-lg:w-screen">
        <table className=" w-full border-collapse border border-gray-200 text-[#4D4D4D] py-2">
          <thead>
            <tr className="text-left">
              <th className="border border-gray-200 font-semibold p-2">Task</th>
              <th className="border border-gray-200  font-semibold p-2">
                Description
              </th>
              <th className="border border-gray-200  font-semibold p-2">
                Priority
              </th>
              <th className="border border-gray-200  font-semibold p-2">
                Status
              </th>
              <th className="border border-gray-200  font-semibold p-2 max-lg:text-nowrap">
                Task Date
              </th>
              <th className="border border-gray-200  font-semibold p-2">
                Deadline
              </th>
              <th className="border border-gray-200 p-2 ">
                <Cog6ToothIcon width={24} height={24} />
              </th>
            </tr>
          </thead>
          <tbody>
            {newTask === true && (
              <tr className="shadow-lg max-lg:text-nowrap max-lg:flex-nowrap ">
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
                    className="p-2 w-full"
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
                    className="p-2 w-full"
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
                    className="p-2 w-full"
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                  />
                </td>
                <td className="border p-2  border-gray-200">
                  <input
                    className="px-2 py-2 w-full"
                    type="date"
                    value={taskDeadline}
                    onChange={(e) => setTaskdeadline(e.target.value)}
                  />
                </td>
                <td className="text-center p-2 ">
                  <button onClick={() => handleTaskCreation()}>
                    <SaveOutlined />
                  </button>
                </td>
              </tr>
            )}
            {
              (filteredTask.length === 0 && tasks.length === 0) && (             
                <tr>
                  <td colSpan={6} className="p-2">
                  <h1 className="text-[#4D4D4D] font-bold text-xl text-center">
                    There are any tasks
                  </h1>
                  </td>
                </tr>
              )
            }
            {filteredTask?.map((group, index) => (
              <Fragment key={group._id}>
                {group.tasks.map((task, index) => (
                  <tr key={index} className="text-left flex-nowrap text-nowrap">
                    <td className="border  border-gray-200 p-2 ">
                      <button onClick={() => handleChangeStatus(task)}>
                        <CheckBoxOutlineBlankOutlined />
                      </button>
                      <span>{task.title}</span>
                    </td>
                    <td className="border border-gray-200 p-2">
                      {task.description
                        ? task.description
                        : "*Sin descripción*"}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {task.priority}
                    </td>
                    <td className="border border-gray-200 flex justify-between p-2 ">
                      {task.status}
                      <Brightness1 className="text-yellow-500 w-3" />
                    </td>
                    <td className="border border-gray-200 p-2 ">
                      {moment(task.taskDate).format("DD-MM-YYYY")}
                    </td>
                    <td className="border border-gray-200 p-2 ">
                      {moment(task.deadline).format("DD-MM-YYYY")}
                    </td>

                    <td className="text-center border border-gray-200 max-lg:p-2">
                      <div className="flex gap-2 items-center justify-center relative">
                        <Tooltip title="Edit" placement="top">
                          <button onClick={() => toogleEditAlert(task)}>
                            <PencilIcon
                              className="text-[#4D4D4D] w-5 h-5"
                              onClick={editTask}
                            />
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                          <button
                            className="hover:text-blue-500"
                            onClick={() => toogleDeleteTask(task)}
                          >
                            <TrashIcon width={24} height={24} />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}

            {tasks.map((group, index) =>
              group.tasks.map(
                (task, index) =>
                  task.status === "completed" && (
                    <tr key={index} className=" flex-nowrap text-nowrap text-left">
                      <td className="border flex gap-3 border-gray-200 p-2">
                        <button onClick={() => handleChangeStatus(task)}>
                          <CheckBox />
                        </button>

                        <span>{task.title}</span>
                      </td>
                      <td className="border border-gray-200 p-2">
                        {task.description
                          ? task.description
                          : "*Sin descripción*"}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {task.priority}
                      </td>
                      <td className="border border-gray-200 flex justify-between p-2">
                        {task.status}
                        <Brightness1 className="text-green-600 w-3 max-lg:ml-2" />
                      </td>
                      <td className="border border-gray-200 p-2">
                      {moment(task.taskDate).format("DD-MM-YYYY")}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {moment(task.deadline).format("DD-MM-YYYY")}
                      </td>
                      <td className="text-center border border-gray-200 max-lg:p-2">
                        <div className="flex gap-2 items-center justify-center">
                          <Tooltip title="Edit" placement="top">
                            <button
                              onClick={() => toogleEditAlert(task)}
                              className="relative hover:text-blue-500 "
                            >
                              <PencilIcon
                                width={24}
                                height={24}
                                onClick={editTask}
                              />
                            </button>
                          </Tooltip>
                          <Tooltip title="Delete" placement="top">
                            <button
                              className="hover:text-blue-500"
                              onClick={() => toogleDeleteTask(task)}
                            >
                              <TrashIcon width={24} height={24} />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </div>
      {showEditTask && (
        <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
          <EditTask
            cancelEditTask={cancelEditTask}
            setShowEditTask={setShowEditTask}
            task={selectedTask}
          />
        </div>
      )}
      {showDeleteTask && (
        <form
          onSubmit={handleDelete}
          className=" rounded-lg shadow-lg border-1 border-gray-400 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white p-4 z-50 flex gap-2 justify-center items-center"
        >
          <button
            className="bg-gray-400 text-white p-2 text-sm"
            onClick={() => setShowDeleteTask(false)}
          >
            Cancel
          </button>
          <button  className="bg-red-400 text-white p-2 text-sm" type="submit">
            Delete
          </button>
        </form>
      )}
    </ThemeProvider>
  );
};
export default TableView;
