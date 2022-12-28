import React, {KeyboardEvent,ChangeEvent, useState} from "react";
import {TaskType} from "./App";

type TodolistType = {
    filterStateTasks: Array<TaskType>
    title: string
    deleteTask: (taskId: string) => void
    changeChekboxTask: (taskId: string,valueChekbox:boolean) => void
    creatTask: (titleTask: string) => void
    filtrationTasks: (filterValue: filterValueType) => void
}

export type filterValueType = 'all' | 'complited' | 'needToDo'




export const Todolist = (props: TodolistType) => {

    const  [titleTask,setTitleTask] = useState('')

    const changeChekboxTaskHandler = (taskId: string,valueChekbox:boolean) => {
      props.changeChekboxTask(taskId,valueChekbox)
    }
    
    const creatTaskClickEnterHundler = (event:KeyboardEvent<HTMLInputElement>) => {
      if(event.key === 'Enter') {
          creatTaskHandler()
      }
    }

    const creatTitleForTaskHundler = (event:ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.currentTarget.value)
    }

    const creatTaskHandler = () => {
        if(titleTask.trim()!=='') {
            props.creatTask(titleTask.trim())
        }
        setTitleTask('')
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
                <input
                    onKeyPress={creatTaskClickEnterHundler}
                    onChange={creatTitleForTaskHundler}
                    value={titleTask}/>
                <button onClick={creatTaskHandler}>+</button>
            </div>
            <div>
                {
                    props.filterStateTasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input
                                    type='checkbox'
                                    checked={task.isDone}
                                    onChange={
                                        (event)=>changeChekboxTaskHandler(task.id,
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
                <button onClick={() => filtrationTasksHundler('all')}>All</button>
                <button onClick={() => filtrationTasksHundler('complited')}>Complited</button>
                <button onClick={() => filtrationTasksHundler('needToDo')}>Need to do</button>
            </div>
        </div>
    )
}