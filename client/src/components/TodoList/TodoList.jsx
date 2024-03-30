"use client"
import { Fragment } from "react";

const TodoList = ({ tasks, setTasks }) => {

    const handleCheck = (idx) => (e) => {
        setTasks((prevValue) => {
            prevValue[idx].completed = e.target.checked;
            return ([...prevValue]);
        })
    }

    const handleDelete = (idx) => () => {
        console.log(idx);
        setTasks((prevValue) => {
            const filteredList = prevValue.filter((item, index) => index !== idx);
            return ([...filteredList]);
        })
    }

    return (
        <Fragment>
            <ul>
                {
                    tasks.map((item, idx) => {
                        return (
                            <li key={idx} style={{}}>
                                <div>
                                    <p style={{ display: "inline", textDecoration: item.completed ? "line-through" : "none" }}>
                                        {item.text}
                                    </p>
                                    <input type="checkbox" checked={item.completed} onChange={handleCheck(idx)} />
                                    <button type="button" onClick={handleDelete(idx)} disabled={!item.completed} >Delete</button>
                                </div>
                            </li>
                        )
                    })
                }   
            </ul>
        </Fragment>
    )

}


export default TodoList;