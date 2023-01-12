import React, {useCallback} from 'react';
import {filterValueType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import HeaderAppBar from "./HeaderAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    changeChekboxTaskAC,
    changeTitleTaskAC,
    createTaskAC,
    deleteTaskAC,
    StateTasksType
} from "./state/taskReducer";
import {
    changeTitleTodolistAC,
    changeTodolistFilterAC,
    createTodolistAC,
    deleteTodolistAC,
    TodolistType
} from "./state/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateStoreType} from "./state/store";


const App = () => {

    const todolists = useSelector<StateStoreType, Array<TodolistType>>(state => state.todolists)

    const tasks = useSelector<StateStoreType, StateTasksType>(state => state.tasks)

    const dispatch = useDispatch()


    const changeTitleTodolist = (idTodol: string, editText: string) => {
        dispatch(changeTitleTodolistAC(idTodol, editText))
    }


    const createTodolist = useCallback((title: string) => {
        dispatch(createTodolistAC(title))
    }, [])

    const deleteTodolist = (idTodol: string) => {
        dispatch(deleteTodolistAC(idTodol))
    }

    const filtrationForTodolist = (idTodol: string, filterValue: filterValueType) => {
        dispatch(changeTodolistFilterAC(idTodol, filterValue))
    }


    const changeTitleTask = (idTodol: string, taskId: string, editText: string) => {
        dispatch(changeTitleTaskAC(idTodol, taskId, editText))
    }


    const deleteTask = (idTodol: string, taskId: string) => {
        dispatch(deleteTaskAC(idTodol, taskId))
    }


    const creatTask = (idTodol: string, titleTask: string) => {
        dispatch(createTaskAC(idTodol, titleTask))
    }


    const changeChekboxTask = (idTodol: string, taskId: string, valueChekbox: boolean) => {
        dispatch(changeChekboxTaskAC(idTodol, taskId, valueChekbox))
    }


    return (
        <div>
            <HeaderAppBar/>
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm callback={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todolists.map(todol => {

                            const tasksForTodolist = tasks[todol.id]
                            return (<Grid item>
                                    <Paper style={{padding: '15px'}}>
                                        <Todolist
                                            changeTitleTask={changeTitleTask}
                                            changeTitleTodolist={changeTitleTodolist}
                                            deleteTodolist={deleteTodolist}
                                            idTodol={todol.id}
                                            key={todol.id}
                                            filter={todol.filter}
                                            changeChekboxTask={changeChekboxTask}
                                            creatTask={creatTask}
                                            filtrationForTodolist={filtrationForTodolist}
                                            deleteTask={deleteTask}
                                            title={todol.title}
                                            tasksForTodolist={tasksForTodolist}/>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App

