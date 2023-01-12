import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditTitle} from "./EditTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {TaskType} from "./state/taskReducer";
import {Task} from "./Task";

type TodolistType = {
    deleteTodolist: (idTodol: string) => void
    tasksForTodolist: Array<TaskType>
    title: string
    deleteTask: (idTodol: string, taskId: string) => void
    changeChekboxTask: (idTodol: string, taskId: string, valueChekbox: boolean) => void
    creatTask: (idTodol: string, titleTask: string) => void
    filtrationForTodolist: (idTodol: string, filterValue: filterValueType) => void
    filter: filterValueType
    idTodol: string
    changeTitleTodolist: (idTodol: string, editText: string) => void
    changeTitleTask: (idTodol: string, taskId: string, editText: string) => void
}

export type filterValueType = 'all' | 'complited' | 'needToDo'


export const Todolist = (props: TodolistType) => {

    const changeTitleTodolist = (editText: string) => {
        props.changeTitleTodolist(props.idTodol, editText)
    }

    const changeTitleTaskHandler = (taskId: string, editText: string) => {
        props.changeTitleTask(props.idTodol, taskId, editText)
    }

    const creatTask = useCallback((titleTask: string) => {
        props.creatTask(props.idTodol, titleTask)
    }, [])


    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.idTodol)
    }

    const changeChekboxTaskHandler = (taskId: string, valueChekbox: boolean) => {
        props.changeChekboxTask(props.idTodol, taskId, valueChekbox)
    }


    const deleteTaskHundler = (taskId: string) => {
        props.deleteTask(props.idTodol, taskId)
    }

    const filtrationForTodolistHundler = (filterValue: filterValueType) => {
        props.filtrationForTodolist(props.idTodol, filterValue)
    }


    let filterStateTasks = props.tasksForTodolist
    if (props.filter === 'complited') {
        filterStateTasks = filterStateTasks.filter(elem => elem.isDone)
    }
    if (props.filter === 'needToDo') {
        filterStateTasks = filterStateTasks.filter(elem => !elem.isDone)
    }

    return (
        <div>
            <h2>
                <EditTitle
                    callback={changeTitleTodolist}
                    title={props.title}/>
                <IconButton
                    size="small"
                    color="primary"
                    onClick={deleteTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h2>
            <AddItemForm
                callback={creatTask}
            />

            <div>
                {
                    filterStateTasks.map(t => {
                        return (
                            <Task
                                changeChekboxTask={changeChekboxTaskHandler}
                                changeTitleTask={changeTitleTaskHandler}
                                deleteTask={deleteTaskHundler}
                                task={t}
                                key={t.id}
                            />
                        )
                    })
                }
            </div>
            <div>
                <Button
                    size="small"
                    variant={props.filter === 'all' ? "contained" : "outlined"}
                    onClick={() => filtrationForTodolistHundler('all')}
                >All
                </Button>
                <Button
                    size="small"
                    variant={props.filter === 'complited' ? "contained" : "outlined"}
                    onClick={() => filtrationForTodolistHundler('complited')}
                >Complited
                </Button>
                <Button
                    size="small"
                    variant={props.filter === 'needToDo' ? "contained" : "outlined"}
                    onClick={() => filtrationForTodolistHundler('needToDo')}
                >Need to do
                </Button>
            </div>
        </div>
    )
}