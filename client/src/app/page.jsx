"use client"
import TodoForm from "@/components/TodoForm/TodoForm";
import TodoList from "@/components/TodoList/TodoList";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TodoForm setTasks={setTasks} />
      <TodoList tasks={tasks} setTasks={setTasks} />
    </main>
  );
}
