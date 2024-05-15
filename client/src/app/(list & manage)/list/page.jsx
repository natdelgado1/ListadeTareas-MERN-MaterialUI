"use client";
import { Fragment } from "react";
import * as React from "react";
import { useState } from "react";
import { findfilterTaskStatusinPending, updateStatus } from "@/app/api/route";
import { useEffect } from "react";
import { FilterContext } from "@/context/FilterContext";
import ListView from "@/components/TasksViews/ListView";

const ListTask = () => {
  const [value, setValue] = useState("Hoy");
  const [tasks, setTasks] = useState([]);
  const { updateFilters, filters } = React.useContext(FilterContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const fetchFilteredTasksStatus = () => {
    findfilterTaskStatusinPending(filters).then((allTasks) => {
      setTasks(allTasks);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleUpdateTask = async (id,data) => {
    await updateStatus(id,data);
    fetchFilteredTasksStatus();
  };

  useEffect(() => {
    fetchFilteredTasksStatus();
  }, [filters]);
  
  useEffect(() => {
    fetchFilteredTasksStatus();
  }, []);

  return (
    <Fragment>
      <ListView tasks={tasks} setTasks={setTasks} handleUpdateTask={handleUpdateTask} />
    </Fragment>
  );
};
export default ListTask;
