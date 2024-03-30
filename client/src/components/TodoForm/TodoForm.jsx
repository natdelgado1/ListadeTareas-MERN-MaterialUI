"use client"
import { useState } from "react";



const TodoForm = ({ setTasks }) => {

    const [newTask, setNewTask] = useState("");

    const handleNewTask = (e) => {
        e.preventDefault();
        console.log(newTask);

        setTasks((prevValue) => {
            prevValue.push({ text: newTask, completed: false });
            console.log(prevValue);
            return ([...prevValue]);
        })
        setNewTask("");

    }

    return (
        <div>
            <form onSubmit={handleNewTask}>
                <div>
                    <input
                        type="text"
                        name="taskInput"
                        id="taskIpt"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit">Add</button>
            </form>

        </div>
    )
}


export default TodoForm;