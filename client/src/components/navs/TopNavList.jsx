"use client"
import { CheckBoxOutlined, TableRowsOutlined } from "@mui/icons-material";
import Link from 'next/link'
import { Fragment } from "react";

const TopNavList = () =>{
    return(
        <Fragment>
            <div className="flex text-[#4D4D4D] gap-3 py-2">
        <Link href={"/list"} >
          <CheckBoxOutlined /> List
        </Link>
        <Link href={"/table"}>
          <TableRowsOutlined /> Table
        </Link>
            </div>
      </Fragment>  
    )
}
export default TopNavList;