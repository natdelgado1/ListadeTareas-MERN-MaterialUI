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
} from "@heroicons/react/24/outline";
import NewTaskAlert from "../alerts/newTaskAlert";

const drawerWidth = 280;

const Sidebar = () => {
  const { updateFilters, filters } = useContext(FilterContext);
  const [user, setUser] = useState(undefined);
  const [showNewTask, setShowNewTask] = useState(false);
  const [hovered, setHovered] = useState(false);

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
    setShowNewTask(false);
  };

  const filterButtons = [
    { title: "Today", value: 1, icon: <CalendarIcon width={24} /> },
    { title: "Week", value: 2, icon: <CalendarDaysIcon width={24} /> },
    { title: "Month", value: 3, icon: <CalendarMonthOutlined /> },
    { title: "Year", value: 4, icon: <CalendarMonthSharp /> },
  ];

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userLocalStorage);
  }, []);
  return (
    <ThemeProvider theme={fondoLila}>
      <Drawer
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
        <Toolbar className="sm:hidden" />
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
            <NewTaskAlert cancelNewTask={cancelNewTask} />
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
                  updateFilters({ ...filters, date: button.value })
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
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;
