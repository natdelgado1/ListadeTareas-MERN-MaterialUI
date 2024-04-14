"use client"
import Fab from "@mui/material/Fab";
import Link  from "next/link";
import { blue } from "@mui/material/colors";
import { AddOutlined } from "@mui/icons-material";

const ListTask = () => {
  return (
    <Link href={{pathname: "/table", query:{addNewTask: true}}} className="absolute right-10 bottom-10 p-0">
      <Fab
        sx={{
          bgcolor: blue[500],
        }}
        aria-label={"Add task"}
        color={"primary"}
      >
        <AddOutlined/>
      </Fab>
    </Link>
  );
};
export default ListTask;
