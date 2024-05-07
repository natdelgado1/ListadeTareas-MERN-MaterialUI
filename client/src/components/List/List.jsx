import { Fragment } from "react";
import * as React from "react";
import { useState } from "react";
import { findfilterTask } from "@/app/api/route";
import { useEffect } from "react";
import { FilterContext } from "@/context/FilterContext";
import TaskView from "../View/TaskView";

const ListForm = () => {
  const [value, setValue] = useState("Hoy");
  const [tasks, setTasks] = useState([]);
  const { updateFilters, filters } = React.useContext(FilterContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const fetchFilteredTasks = () => {
    findfilterTask(filters)
      .then((allTasks) => {
        setTasks(allTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFilteredTasks();
  }, [filters]);
  return (
    <Fragment>
     
      <TaskView tasks={tasks} setTasks={setTasks} />
    </Fragment>
  );
};

export default ListForm;
