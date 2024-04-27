"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { fondoLila } from "@/theme";
import { ThemeProvider } from "@mui/material";

import { CalendarMonthOutlined, CalendarMonthSharp } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { FilterContext } from "@/context/FilterContext";
import { CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/outline";
import FloatingAction from "../Button/NewTaskButton";
import NewTaskButton from "../Button/NewTaskButton";
import NewTaskAlert from "../alerts/newTaskAlert";

const drawerWidth = 280;

const Sidebar = () => {
  const { updateFilters, filters } = useContext(FilterContext);
  const [user, setUser] = useState(undefined);
  const [showNewTask, setShowNewTask] = useState(false);

  const newTask = () => {
    setShowNewTask(true);
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
        <div >
          <NewTaskButton onClick={newTask} />
          <div className="w-max h-max relative overflow-visible z-50  ">
            {showNewTask && (
              <NewTaskAlert
                cancelNewTask={cancelNewTask}
                showNewTask={showNewTask}
              />
            )}
          </div>
        </div>
        <Box sx={{ overflow: "auto" }}>
          <List>
            {filterButtons.map((button, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={(e) =>
                  updateFilters({ ...filters, date: button.value })
                }
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
