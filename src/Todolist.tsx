import React from "react";
import {TaskType} from "./App";

type TodolistType = {
    tasks: Array<TaskType>
    title: string
}

export const Todolist = (props: TodolistType) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                {
                    props.tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input
                                    type='checkbox'
                                    checked={task.isDone}
                                />
                                <span>{task.title}</span>
                            </li>
                        )
                    })
                }
            </div>
            <div>
                <button>All</button>
                <button>Complited</button>
                <button>Need to do</button>
            </div>
        </div>
    )
}