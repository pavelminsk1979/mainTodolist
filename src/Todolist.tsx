import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditTitle} from "./EditTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {Task} from "./Task";
import {filterValueType} from "./state/todolistReducer";
import {TaskStatuses, TaskType} from "./api/api";
import {useDispatch} from "react-redux";
import {setTaskTC} from "./state/taskReducer";



type TodolistType = {
    deleteTodolist: (idTodol: string) => void
    tasksForTodolist: Array<TaskType>
    title: string
    deleteTask: (idTodol: string, taskId: string) => void
    changeChekboxTask: (idTodol: string, taskId: string, newStatus:boolean) => void
    creatTask: (idTodol: string, titleTask: string) => void
    filtrationForTodolist: (idTodol: string, filterValue: filterValueType) => void
    filter: filterValueType
    idTodol: string
    changeTitleTodolist: (idTodol: string, editText: string) => void
    changeTitleTask: (idTodol: string, taskId: string, editText: string) => void
    disableStatus:boolean
}




export const Todolist = (props: TodolistType) => {

    const dispatch = useDispatch<any>()

    useEffect(()=>{
        dispatch (setTaskTC(props.idTodol))
    },[])

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

    const changeChekboxTaskHandler = (taskId: string, newStatus:boolean) => {
        props.changeChekboxTask(props.idTodol, taskId, newStatus)
    }


    const deleteTaskHundler = (taskId: string) => {
        props.deleteTask(props.idTodol, taskId)
    }

    const filtrationForTodolistHundler = (filterValue: filterValueType) => {
        props.filtrationForTodolist(props.idTodol, filterValue)
    }


    let filterStateTasks = props.tasksForTodolist
    if (props.filter === 'complited') {
        filterStateTasks = filterStateTasks.filter(elem => elem.status===TaskStatuses.Complete)
    }
    if (props.filter === 'needToDo') {
        filterStateTasks = filterStateTasks.filter(elem => elem.status===TaskStatuses.New)
    }

    return (
        <div>
            <h2>
                <EditTitle
                    callback={changeTitleTodolist}
                    title={props.title}/>
                <IconButton
                    disabled={props.disableStatus}
                    size="small"
                    color="primary"
                    onClick={deleteTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h2>
            <AddItemForm
                disableStatus={props.disableStatus}
                callback={creatTask}
            />

            <div>
                {
                    filterStateTasks.map(t => {
                        return (
                            <Task
                                disableStatus={props.disableStatus}
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