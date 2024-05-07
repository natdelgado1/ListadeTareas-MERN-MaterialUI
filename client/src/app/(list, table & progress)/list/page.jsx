"use client";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import { blue } from "@mui/material/colors";
import { AddOutlined } from "@mui/icons-material";
import ListForm from "@/components/List/List";
import { Fragment } from "react";
import NewTaskAlert from "@/components/alerts/newTaskAlert";

const ListTask = () => {
  return (
    <Fragment>
      <ListForm />
          <NewTaskAlert/>
    </Fragment>
  );
};
export default ListTask;
