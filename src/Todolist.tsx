import React from "react";
import {TaskType} from "./App";

type TodolistType = {
    filterStateTasks: Array<TaskType>
    title: string
    deleteTask: (taskId: number) => void
    filtrationTasks: (filterValue: filterValueType) => void
}

export type filterValueType = 'all' | 'complited' | 'needToDo'


export const Todolist = (props: TodolistType) => {

    const deleteTaskHundler = (taskId: number) => {
        props.deleteTask(taskId)
    }

    const filtrationTasksHundler = (filterValue: filterValueType) => {
        props.filtrationTasks(filterValue)
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                {
                    props.filterStateTasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input
                                    type='checkbox'
                                    checked={task.isDone}
                                />
                                <span>{task.title}</span>
                                <button onClick={() => deleteTaskHundler(task.id)}>DEL</button>
                            </li>
                        )
                    })
                }
            </div>
            <div>
                <button onClick={() => filtrationTasksHundler('all')}>All</button>
                <button onClick={() => filtrationTasksHundler('complited')}>Complited</button>
                <button onClick={() => filtrationTasksHundler('needToDo')}>Need to do</button>
            </div>
        </div>
    )
}