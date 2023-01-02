import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {TaskType} from "./App";
import st from './Todolist.module.css';
import {AddItemForm} from "./AddItemForm";

type TodolistType = {
    deleteTodolist: (idTodol: string) => void
    filterStateTasks: Array<TaskType>
    title: string
    deleteTask: (idTodol: string, taskId: string) => void
    changeChekboxTask: (idTodol: string, taskId: string, valueChekbox: boolean) => void
    creatTask: (idTodol: string, titleTask: string) => void
    filtrationTasks: (idTodol: string, filterValue: filterValueType) => void
    filter: filterValueType
    idTodol: string
}

export type filterValueType = 'all' | 'complited' | 'needToDo'


export const Todolist = (props: TodolistType) => {

    const creatTask = (titleTask:string) => {
            props.creatTask(props.idTodol, titleTask)
    }


    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.idTodol)
    }

    const changeChekboxTaskHandler = (taskId: string, valueChekbox: boolean) => {
        props.changeChekboxTask(props.idTodol, taskId, valueChekbox)
    }


    const deleteTaskHundler = (taskId: string) => {
        props.deleteTask(props.idTodol, taskId)
    }

    const filtrationTasksHundler = (filterValue: filterValueType) => {
        props.filtrationTasks(props.idTodol, filterValue)
    }

    return (
        <div>
            <h2>{props.title}
                <button onClick={deleteTodolistHandler}>DEL</button>
            </h2>
            <AddItemForm
            callback = {creatTask}
            />

            <div>
                {
                    props.filterStateTasks.map(task => {
                        return (
                            <li key={task.id} className={task.isDone ? st.isDone : ''}>
                                <input
                                    type='checkbox'
                                    checked={task.isDone}
                                    onChange={
                                        (event) => changeChekboxTaskHandler(task.id,
                                            event.currentTarget.checked)
                                    }
                                />
                                <span>{task.title}</span>
                                <button onClick={() => deleteTaskHundler(task.id)}>DEL</button>
                            </li>
                        )
                    })
                }
            </div>
            <div>
                <button
                    className={props.filter === 'all' ? st.filtr : ''}
                    onClick={() => filtrationTasksHundler('all')}
                >All
                </button>
                <button
                    className={props.filter === 'complited' ? st.filtr : ''}
                    onClick={() => filtrationTasksHundler('complited')}
                >Complited
                </button>
                <button
                    className={props.filter === 'needToDo' ? st.filtr : ''}
                    onClick={() => filtrationTasksHundler('needToDo')}
                >Need to do
                </button>
            </div>
        </div>
    )
}