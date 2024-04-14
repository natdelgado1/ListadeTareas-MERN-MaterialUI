"use client"
import BoardList from "@/components/BoardList/BoardList";
import Sidebar from "@/components/navs/Sidebar";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const Tablepage = () =>{
  const searchParams = useSearchParams();
  const [addNewTask, setAddNewTask] = useState(new Boolean(searchParams.get('addNewTask') || false));

  useEffect(() =>{
    console.log(addNewTask);
  },[addNewTask])
    return(
      <Fragment>
        <Sidebar/>
        <BoardList addNewTask={addNewTask.valueOf()} />
      </Fragment>
  
    )
}
export default Tablepage;