import BoardList from "@/components/BoardList/BoardList";
import Sidebar from "@/components/navs/Sidebar";
import { Fragment } from "react";

const Tablepage = () =>{
    return(
      <Fragment>
        <Sidebar/>
        <BoardList/>
      </Fragment>
  
    )
}
export default Tablepage;