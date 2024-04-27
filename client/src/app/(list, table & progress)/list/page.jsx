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
      <Link
        href={{ pathname: "/table", query: { addNewTask: true } }}
        className="absolute right-10 bottom-10 p-0"
        >
        <Fab
          sx={{
            bgcolor: blue[500],
          }}
          aria-label={"Add task"}
          color={"primary"}
          >
          <AddOutlined />
        </Fab>
      </Link>
      <ListForm />
          <NewTaskAlert/>
    </Fragment>
  );
};
export default ListTask;
