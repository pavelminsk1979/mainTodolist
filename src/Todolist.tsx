import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {TaskType} from "./App";
import st from './Todolist.module.css';

type TodolistType = {
    filterStateTasks: Array<TaskType>
    title: string
    deleteTask: (taskId: string) => void
    changeChekboxTask: (taskId: string, valueChekbox: boolean) => void
    creatTask: (titleTask: string) => void
    filtrationTasks: (filterValue: filterValueType) => void
    filter:filterValueType
}

export type filterValueType = 'all' | 'complited' | 'needToDo'


export const Todolist = (props: TodolistType) => {

    const [titleTask, setTitleTask] = useState('')
    const [error, setError] = useState<null | string>(null)

    const changeChekboxTaskHandler = (taskId: string, valueChekbox: boolean) => {
        props.changeChekboxTask(taskId, valueChekbox)
    }

    const creatTaskClickEnterHundler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            creatTaskHandler()
        }
    }

    const creatTitleForTaskHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.currentTarget.value)
        setError(null)
    }

    const creatTaskHandler = () => {
        if (titleTask.trim() !== '') {
            props.creatTask(titleTask.trim())
            setTitleTask('')
        } else {
            setError('Text is required')
        }

    }

    const deleteTaskHundler = (taskId: string) => {
        props.deleteTask(taskId)
    }

    const filtrationTasksHundler = (filterValue: filterValueType) => {
        props.filtrationTasks(filterValue)
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <input className={error ? st.frame : ''}
                       onKeyPress={creatTaskClickEnterHundler}
                       onChange={creatTitleForTaskHundler}
                       value={titleTask}/>
                <button onClick={creatTaskHandler}>+</button>
                {error && <div className={st.error}>{error}</div>}
            </div>
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
                    className={props.filter==='all'? st.filtr : ''}
                    onClick={() => filtrationTasksHundler('all')}
                >All
                </button>
                <button
                    className={props.filter==='complited'? st.filtr : ''}
                    onClick={() => filtrationTasksHundler('complited')}
                >Complited
                </button>
                <button
                    className={props.filter==='needToDo'? st.filtr : ''}
                    onClick={() => filtrationTasksHundler('needToDo')}
                >Need to do
                </button>
            </div>
        </div>
    )
}