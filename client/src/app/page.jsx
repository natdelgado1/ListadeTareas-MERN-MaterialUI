"use client"
import TodoForm from "@/components/TodoForm/TodoForm";
import TodoList from "@/components/TodoList/TodoList";
import { useState } from "react";
import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  return (
    <main>
      <ThemeProvider theme={theme}>
        <TodoForm setTasks={setTasks} />
        <TodoList tasks={tasks} setTasks={setTasks} />
      </ThemeProvider>
    </main>
  );
}
