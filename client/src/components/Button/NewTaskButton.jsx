"use client";
import { PlusCircleIcon } from "@heroicons/react/24/outline";


const NewTaskButton = ({onClick}) => {

  return (
    <button onClick={()=> onClick()} className="flex gap-2 ps-4 py-2"    
    >
      <PlusCircleIcon
        width={26}
        className="color-lila"
      />
      <span className="color-lila font-semibold">New Task</span>
    </button>
  );
};

export default NewTaskButton;
