import {
  ChatBubbleLeftRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { Fragment } from "react";
const TaskView = ({ tasks }) => {
  const today = moment();
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
    <Fragment>
      {tasks.map((group, index) => (
        <div key={group._id}>
          <div className="relative ">
            <h1 className="text-[#4D4D4D] font-bold text-3xl">
              {getGroupTitle(group._id)}
            </h1>
            {getDateDiff(group._id) >= -2 && getDateDiff(group._id) <= 2 && (
              <p>{group._id}</p>
            )}
          </div>
          <hr className="mt-6" />
          {group.tasks.map((task, index) => (
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
                  <PencilIcon className="text-[#4D4D4D] w-5 h-5" />
                  <ChatBubbleLeftRightIcon className="text-[#4D4D4D] h-5 w-5" />
                  <TrashIcon className="text-[#4D4D4D] h-5 w-5" />
                </div>
              </div>
              <hr className="mt-4" />
            </div>
          ))}
        </div>
      ))}
    </Fragment>
  );
};

export default TaskView;
