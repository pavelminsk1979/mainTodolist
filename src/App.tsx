import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import HeaderAppBar from "./HeaderAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    changeChekboxTaskAC, changeChekboxTaskTC,
    changeTitleTaskAC, changeTitleTaskTC,
    createTaskTC,
    deleteTaskTC,
    StateTasksType
} from "./state/taskReducer";
import {
    changeTitleTodolistAC,
    changeTodolistFilterAC, CompleteTodolistType,
    createTodolistAC,
    deleteTodolistAC, filterValueType, setTodolist
} from "./state/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateStoreType} from "./state/store";



const App = () => {
    const dispatch = useDispatch<any>()

    const todolists = useSelector<StateStoreType, Array<CompleteTodolistType>>(state => state.todolists)

    const tasks = useSelector<StateStoreType, StateTasksType>(state => state.tasks)



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
        dispatch(changeTitleTaskTC(idTodol, taskId, editText))
    }


    const deleteTask = (idTodol: string, taskId: string) => {
        dispatch(deleteTaskTC(idTodol, taskId))
    }


    const creatTask = (idTodol: string, titleTask: string) => {
        dispatch(createTaskTC(idTodol, titleTask))
    }


    const changeChekboxTask = (idTodol: string, taskId: string, valueChekbox: boolean) => {
        dispatch(changeChekboxTaskTC(idTodol, taskId, valueChekbox))
    }

    useEffect(() =>{
        dispatch(setTodolist())
    },[])


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

