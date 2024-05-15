"use client"
import Sidebar from "@/components/navs/Sidebar";
import TableView from "@/components/TasksViews/TableView";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const ManagePage = () =>{
  const searchParams = useSearchParams();
  const [addNewTask, setAddNewTask] = useState(new Boolean(searchParams.get('addNewTask') || false));
  
  
  useEffect(() =>{
  },[addNewTask])
    return(
      <Fragment>
        <Sidebar/>
        <TableView addNewTask={addNewTask.valueOf()} />
      </Fragment>
  
    )
}
export default ManagePage;