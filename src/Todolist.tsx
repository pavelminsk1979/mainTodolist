import React from "react";
import st from './Todolist.module.css';
import {AddItemForm} from "./AddItemForm";
import {EditTitle} from "./EditTitle";
import Button from "@mui/material/Button";
import DeleteSweep from "@mui/icons-material/DeleteSweep";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {TaskType} from "./state/taskReducer";

type TodolistType = {
    deleteTodolist: (idTodol: string) => void
    filterStateTasks: Array<TaskType>
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

    const changeTitleTask = (taskId: string, editText: string) => {
        props.changeTitleTask(props.idTodol, taskId, editText)
    }

    const creatTask = (titleTask: string) => {
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

    const filtrationForTodolistHundler = (filterValue: filterValueType) => {
        props.filtrationForTodolist(props.idTodol, filterValue)
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
                    props.filterStateTasks.map(task => {
                        return (
                            <div key={task.id} className={task.isDone ? st.isDone : ''}>
                                <Checkbox
                                    size="small"
                                    checked={task.isDone}
                                    onChange={
                                        (event) => changeChekboxTaskHandler(task.id,
                                            event.currentTarget.checked)
                                    }
                                />
                                <EditTitle
                                    title={task.title}
                                    callback={(editText: string) => changeTitleTask(
                                        task.id, editText)}/>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => deleteTaskHundler(task.id)}>
                                    <DeleteSweep/>
                                </IconButton>

                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button
                    size="small"
                    variant={props.filter === 'all'?"contained":"outlined"}
                    onClick={() => filtrationForTodolistHundler('all')}
                >All
                </Button>
                <Button
                    size="small"
                    variant={props.filter === 'complited'?"contained":"outlined"}
                    onClick={() => filtrationForTodolistHundler('complited')}
                >Complited
                </Button>
                <Button
                    size="small"
                    variant={props.filter === 'needToDo'?"contained":"outlined"}
                    onClick={() => filtrationForTodolistHundler('needToDo')}
                >Need to do
                </Button>
            </div>
        </div>
    )
}