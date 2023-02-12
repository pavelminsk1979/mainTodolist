import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {changeChekboxTaskTC,
    changeTitleTaskTC,
    createTaskTC,
    deleteTaskTC,
    StateTasksType
} from "./state/taskReducer";
import {changeTitleTodolistTC,
    changeTodolistFilterAC, CompleteTodolistType,
    createTodolistTC,
    deleteTodolistTC, filterValueType, setTodolist
} from "./state/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateStoreType} from "./state/store";
import LinearProgress from "@mui/material/LinearProgress";
import {StatusLoadingType} from "./state/appReducer";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Navigate} from "react-router-dom";




export const RootTodolist = () => {
    const dispatch = useDispatch<any>()
    const isLogged = useSelector<StateStoreType,boolean>(state => state.isLogin.isLoggedIn)

    const todolists = useSelector<StateStoreType, Array<CompleteTodolistType>>(state => state.todolists)

    const tasks = useSelector<StateStoreType, StateTasksType>(state => state.tasks)

    const loading = useSelector<StateStoreType,StatusLoadingType>(state =>state.app.statusLoading)



    const changeTitleTodolist = (idTodol: string, editText: string) => {
        dispatch(changeTitleTodolistTC(idTodol, editText))
    }


    const createTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])

    const deleteTodolist = (idTodol: string) => {
        dispatch(deleteTodolistTC(idTodol))
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


    const changeChekboxTask = (idTodol: string, taskId: string, newStatus:boolean) => {
        dispatch(changeChekboxTaskTC(idTodol, taskId, newStatus))
    }

    useEffect(() =>{
        if(!isLogged){
            return
        }
        dispatch(setTodolist())
    },[])

    if(!isLogged){
        return <Navigate to={'/login'}/>
    }


    return (
        <div>
            <ErrorSnackbar/>

            {loading==='loading'&& <LinearProgress color="inherit" />}

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
                                            disableStatus={todol.disableStatus}
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

