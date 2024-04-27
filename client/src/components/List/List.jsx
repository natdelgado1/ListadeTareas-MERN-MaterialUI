import { Fragment } from "react";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import { findAllTasks, findfilterTask } from "@/app/api/route";
import { useEffect } from "react";
import { FilterContext } from "@/context/FilterContext";
import moment from "moment/moment";
import WeekView from "../View/TaskView";
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
     
      <TaskView tasks={tasks} />
    </Fragment>
  );
};

export default ListForm;
