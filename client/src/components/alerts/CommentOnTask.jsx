"use client"
import { updateDescription } from "@/app/api/route";
import { PaperAirplaneIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CommentOnTask = ({ commentPosition, task, setShowComment, onSubmit }) => {
  const taskId = task?._id;
  const [taskDescription, setTaskDescription] = useState(task?.description || "");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e?.preventDefault();
   onSubmit(e)
  };
  return (
    <form
      id="comment-form"
      onSubmit={handleSubmit}
      className="rounded-lg px-4 py-3 text-sm bg-white absolute z-50 h-fit shadow-lg border-1 border-gray-400"
      style={{ top: `${commentPosition.y + 1}px`, right: `5px` }}
    >
      <div>
        <textarea
          className="block outline-none text-sm rounded-md w-full"
          placeholder="Comentario"
          id="comment"
          name="comment"
          rows="3"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowComment(false);
          }}
        >
          <XMarkIcon width={24} height={24} />  
        </button>
        <button type="submit">
          <PaperAirplaneIcon width={24} height={24} />{" "}
        </button>
      </div>
    </form>
  );
};

export default CommentOnTask;
