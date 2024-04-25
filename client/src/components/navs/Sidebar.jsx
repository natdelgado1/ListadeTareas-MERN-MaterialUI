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
import {
  CalendarMonthOutlined,
  DateRangeOutlined,
  TodayOutlined,
} from "@mui/icons-material";

const drawerWidth = 280;

const Sidebar = () => {
  return (
    
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar className="sm:hidden" />
      <div className="flex gap-2 p-2 ">
        <div className="w-max justify-center">
          <div  className=" fondo-gris h-14 w-14 rounded-full flex justify-center items-center text-white text-2xl font-semibold">N</div>
        </div>
        <div className="flex-1 flex-col flex items-start overflow-hidden justify-center">
          <span className="font-semibold">Natalia Delgado</span>
          <span className=" text-sm">natdelgadodev@gmail.com</span>
        </div>
      </div>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {["Today", "Week", "Month"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? (
                    <TodayOutlined />
                  ) : index === 1 ? (
                    <DateRangeOutlined />
                  ) : (
                    <CalendarMonthOutlined />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
