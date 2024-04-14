import Fragment from "react";
import Fab from "@mui/material/Fab";
import { blue } from "@mui/material/colors";
import { AddOutlined } from "@mui/icons-material";

const FloatingAction = () =>{
    const [newTask, setNewTask] = useState(false);

    return(
        <Fragment>
            <Fab
      onClick={(e)=>setNewTask(!newTask)}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          bgcolor: blue[500],
        }}
        aria-label={"Add task"}
        color={"primary"}
      >
        <AddOutlined/> 
      </Fab>
        </Fragment>
    )
}

export default FloatingAction;