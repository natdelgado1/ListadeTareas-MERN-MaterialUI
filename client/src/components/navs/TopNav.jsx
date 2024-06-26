"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { useEffect } from 'react';

const TopNav = () =>  {
    const router = useRouter();
    const [user, setUser] = useState(undefined);
    useEffect(() => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      setUser(userLocalStorage);
    }, []);
    const[showSidebar, setShowSidebar] = useState(false);
    const handleSidebar= () =>{
        setShowSidebar(!showSidebar);
    }
    const handleRedirect = (route) => {
        router.push(route);
    }

  return (
    <ThemeProvider theme={theme}>
      <AppBar className='sm:hidden z-50'  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => handleSidebar()}
          >
            <MenuIcon />
            
          </IconButton>
            {
              showSidebar && (
                <Sidebar showSidebar={showSidebar} handleSidebar={handleSidebar}/>
              )
            }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={"/"} style={{color: "white", textDecoration: "none"}}>
                Lista de Tareas
            </Link>
          </Typography>
          <Button className={`${user? "max-lg:hidden": ""}`} color="inherit" onClick={() => handleRedirect("/login")}>Login</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default TopNav;