"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { fondoLila } from "@/theme";
import { ThemeProvider } from "@mui/material";
import { CalendarMonthOutlined, CalendarMonthSharp } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { FilterContext } from "@/context/FilterContext";
import {
  CalendarDaysIcon,
  CalendarIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import NewTaskModal from "../Modals/newTaskModal";

const drawerWidth = 280;
const Sidebar = ({showSidebar, handleSidebar}) => {
  const { updateFilters, filters } = useContext(FilterContext);
  const {user} = useUser();
  const [showNewTask, setShowNewTask] = useState(false);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const toggleNewTask = () => {
    setShowNewTask(!showNewTask);
  };

  const cancelNewTask = () => {
    toggleNewTask();
  };

  const filterButtons = [
    { title: "Today", value: 1, icon: <CalendarIcon width={24} /> },
    { title: "Week", value: 2, icon: <CalendarDaysIcon width={24} /> },
    { title: "Month", value: 3, icon: <CalendarMonthOutlined /> },
    { title: "Year", value: 4, icon: <CalendarMonthSharp /> },
  ];
  const logout = () => {
    localStorage.removeItem("user"); 
    router.push("/login"); 
  };

  const handleFiltButton = (button) => {
    updateFilters({ ...filters, date: button.value });
    if(handleSidebar){
      handleSidebar();
    }
  }
  return (
    <ThemeProvider theme={fondoLila}
    >
      <Drawer
        className={` ${!showSidebar ? "max-lg:hidden": "fixed" } max-lg:z-10`}
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            padding: fondoLila.spacing(1),
          },
        }}
      >
        <Toolbar className="hidden" />
        {
          showSidebar &&
        (<button className="w-4 ring-1 ring-purple-400" onClick={handleSidebar}>
          <XMarkIcon className="text-purple-400"/> 
        </button>)
        }
        <div className="flex gap-2 p-2 ">
          <div className="w-max justify-center">
            <div className=" fondo-lila h-14 w-14 rounded-full flex justify-center items-center text-white text-2xl font-semibold">
              {user?.name[0].toUpperCase()}
            </div>
          </div>
          <div className="flex-1 flex-col flex items-start overflow-hidden justify-center">
            <span className="font-semibold">{user?.name}</span>
            <span className=" text-sm">{user?.email}</span>
          </div>
        </div>
        <button
          onClick={() => toggleNewTask()}
          className="flex gap-2 ps-4 py-2"
        >
          <PlusCircleIcon width={24} height={24} className="color-lila" />
          <span className="color-lila font-semibold">New Task</span>
        </button>
        {showNewTask && (
          <div className="fixed overflow-visible z-50  ">
            <NewTaskModal setShowNewTask={setShowNewTask} cancelNewTask={cancelNewTask} handleSidebar={handleSidebar} />
          </div>
        )}

        <Box sx={{ overflow: "auto" }}>
          <List>
            {filterButtons.map((button, index) => (
              <ListItem
                key={index}
                style={{
                  backgroundColor: hovered ? "fondo-lila" : "transpatent",
                  transition: "background-color 0.3s ease",
                }}
                disablePadding
                onClick={(e) =>
                  handleFiltButton(button,e)
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ListItemButton>
                  <ListItemIcon>{button.icon}</ListItemIcon>
                  <ListItemText primary={button.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <button className="shadow-lg z-50 w-1/3 fondo-lila max-lg:button-10 absolute bottom-5 self-center text-white h-8 rounded-xl text-center"  onClick={(e)=> logout() }>Logout</button>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;