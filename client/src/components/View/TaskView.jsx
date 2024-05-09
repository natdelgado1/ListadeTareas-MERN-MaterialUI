"use client";
import { updateDescription, updateTask } from "@/app/api/route";
import {
  ChatBubbleLeftRightIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { useState } from "react";
import { Fragment } from "react";
import EditTask from "../alerts/EditTask";
import CommentOnTask from "../alerts/CommentOnTask";
const TaskView = ({ tasks, setTasks }) => {
  const today = moment();
  const [showOver, setShowOver] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 });

  const editTask = () => {
    setShowEditTask(true);
  };
  const cancelEditTask = () => {
    setShowEditTask(false);
  }

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

  const hanleOverEnter = (value) => {
    setShowOver(value);
  };
  const handleOverLeave = () => {
    setShowOver(false);
  };

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

    if (diff === -2) return "Anteayer";
    else if (diff === -1) return "Ayer";
    else if (diff === 0) return "Hoy";
    else if (diff === 1) return "Mañana";
    else return moment(date).format("dddd, DD [of] MMMM");
  };

  const getDateDiff = (date) => {
    return today.diff(new Date(date), "days");
  };

  return (
    <div className="relative">
      {tasks.map((group, index) => (
        <div key={group._id}>
          {group.tasks.filter((task) => task.status === "pending").length ? (
            <Fragment>
              <div className="relative ">
                <h1 className="text-[#4D4D4D] font-bold text-3xl">
                  {getGroupTitle(group._id)}
                </h1>
                {getDateDiff(group._id) >= -2 &&
                  getDateDiff(group._id) <= 2 && <p>{group._id}</p>}
              </div>
              <hr className="mt-6" />
            </Fragment>
          ) : null}
          {group.tasks.filter((task) => task.status === "pending").map((task, index) => (
              <div key={index} className="pt-2" id={`task_${task._id}`}>
                <div className="flex py-1">
                  <div className="p-4 max-w-xs  bg-white rounded-xl  flex-1 relative">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="checked-demo"
                        value="1"
                        className="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-[#9C27B0] checked:border-transparent focus:outline-none"
                      />

                      <span className="text-gray-900 font-medium text-xl">
                        {task.title}
                      </span>
                    </label>
                    <span className="absolute top-10 left-14 text-sm text-[#696666]">
                      {task.description}
                    </span>
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
                    <button
                      className="relative"
                      onMouseEnter={() => hanleOverEnter(true)}
                      onMouseLeave={() => handleOverLeave()}
                      onClick={() => toogleEditAlert(task)}
                    >
                      <PencilIcon
                        className="text-[#4D4D4D] w-5 h-5"
                        onClick={editTask}
                      />
                      <div className="h-10 right-60 absolute overflow-visible z-50  "></div>
                      {showOver && (
                        <h3
                          className=" absolute bottom-6 fondo-gris h-7
                         w-11 text-white rounded-md text-center"
                        >
                          Edit
                        </h3>
                      )}
                    </button>
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
        <div className="fixed top-44 left-96">
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
  );
};

export default TaskView;
