"use client";
import { updateDescription} from "@/app/api/route";
import {
  ChatBubbleLeftRightIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import EditTask from "../Modals/EditTask";
import CommentOnTask from "../Modals/CommentOnTask";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { Snackbar, Tooltip } from "@mui/material";
const ListView = ({ tasks, setTasks, handleUpdateTask }) => {
  const today = moment();
  const [showEditTask, setShowEditTask] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 });
  const [taskCompleted, setTaskCompleted] = useState(false);

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
  const toggleCommentOnTask = (task) => {
    setShowComment(!showComment);
    let taskComponent = document
      .getElementById(`task_${task._id}`)
      .getBoundingClientRect();
    setCommentPosition({ x: taskComponent.x, y: taskComponent.y });
    setSelectedTask(task);
  };

  const handleCompleteTask =  (id) => {
      const data = {
        status: "completed",
      };
      handleUpdateTask(id, data);
      setTaskCompleted(true);
  }
  const handleCommentEdit = async (e) => {
    if (selectedTask._id) {
      const data = {
        description: e.target.comment.value,
      };
      try {
        const result = await updateDescription(selectedTask._id, data);
        const tempTasks = tasks.map((group) => {
          const tempGroup = group;
          tempGroup.tasks = group.tasks.map((task) => {
            if (task._id === result._id) {
              return result;
            }
            return task;
          });
          return tempGroup;
        });

        setTasks(tempTasks);

        console.log(result);
        setShowComment(false);
      } catch (error) {
        console.log("Error al actualizar la descripción de la tarea:", error);
      }
    }
  };

  const getGroupTitle = (date) => {
    const diff = getDateDiff(date);

    if (diff === 2) return "Anteayer";
    else if (diff === 1) return "Ayer";
    else if (diff === 0) return "Hoy"
    else if (diff === -1) return "Mañana";
    else return moment(date).format("dddd, DD [of] MMMM");
  };

  const getDateDiff = (date) => {
    let date1 = moment(date).format("YYYY-MM-DD");
    let date2 = moment(today).format("YYYY-MM-DD");

    let diff = moment(date2).diff(date1, "days");

    return diff;
  };

  return tasks.length > 0 ? (
    <div className="relative">
        
        <Snackbar
          open={taskCompleted}
          message="Task completed successfully!"
          autoHideDuration={2000}
          onClose={() => setTaskCompleted(false)}
        />
      {tasks.map((group, index) => (
        <div key={group._id}>
          {group.tasks.filter((task) => task.status === "pending").length ? (
            <Fragment>
              <div className="relative">
                <h1 className="text-[#4D4D4D] font-bold text-3xl max-lg:text-2xl">
                  {getGroupTitle(group._id)}
                </h1>
                {getDateDiff(group._id) >= -2 &&
                  getDateDiff(group._id) <= 2 && <p>{moment(group._id).format('dddd, DD [of] MMMM')}</p>}
              </div>
              <hr className="mt-6 max-lg:mt-3" />
            </Fragment>
          ) : null}
          {group.tasks
            .filter((task) => task.status === "pending")
            .map((task, index) => (
              <div key={index} className="pt-2" id={`task_${task._id}`}>
                <div className="flex py-1">
                  <div className="p-4 max-lg:p-2  bg-white rounded-xl  flex-1  flex items-center">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium text-xl max-lg:text-lg flex items-center gap-2">
                      <Tooltip title="Complete this task">
                      <button onClick={() => handleCompleteTask(task._id)}>
                        <CheckBoxOutlineBlank />
                      </button>
                      </Tooltip>
                      
                        {task.title}
                      </span>
                      <span className="text-sm ml-7 text-[#696666]">
                        {task.description
                          ? task.description
                          : "Sin descripción"}
                      </span>
                    </div>
                  </div>
                  <div className="relative flex items-center flex-1 justify-end gap-2">
                    <div
                      className={`rounded-lg h-3 w-3 ${
                        task.priority === "low"
                          ? "bg-green-500"
                          : task.priority === "medium"
                          ? "bg-yellow-500"
                          : task.priority === "high"
                          ? "bg-[#F44336]"
                          : ""
                      }`}
                    ></div>
                    <Tooltip title="Edit" placement="top">
                    <button
                      className="relative"
                      onClick={() => toogleEditAlert(task)}
                    >
                      <PencilIcon
                        className="text-[#4D4D4D] w-5 h-5"
                        onClick={editTask}
                      />
                    </button>
                    </Tooltip>
                    <button onClick={() => toggleCommentOnTask(task)}>
                      <ChatBubbleLeftRightIcon className="text-[#4D4D4D] h-5 w-5" />
                    </button>
                  </div>
                </div>
                <hr className="mt-4" />
              </div>
            ))}
        </div>
      ))}
      {showEditTask && (
        <div className="fixed top-44 left-96 max-xl:left-6">
          <EditTask
            cancelEditTask={cancelEditTask}
            setShowEditTask={setShowEditTask}
            task={selectedTask}
          />
        </div>
      )}
      {showComment && (
        <CommentOnTask
          commentPosition={commentPosition}
          task={selectedTask}
          setShowComment={setShowComment}
          onSubmit={handleCommentEdit}
        />
      )}
    </div>
  ) : (
    <div className="flex justify-center items-center h-96 max-lg:text-center ">
      <h1 className="text-[#4D4D4D] font-bold text-3xl max-lg:text-2xl">
        There are no pending tasks
      </h1>
    </div>
  );
};

export default ListView;
