import React, {useState} from 'react';
import {filterValueType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import HeaderAppBar from "./HeaderAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type StateTodolistType = {
    id: string
    title: string
    filter: filterValueType
}

type StateTasksType = {
    [key : string] : Array<TaskType>
}

const App = () => {

    const todolist1 = v1();
    const todolist2 = v1();

    const [todolists, setTodolists] = useState<Array<StateTodolistType>>(
        [
            {id: todolist1, title: 'What to learn', filter: 'all'},
            {id: todolist2, title: 'What to watch', filter: 'all'}
        ]
    )

    const [tasks, setTasks] = useState<StateTasksType>({
        [todolist1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'English', isDone: false}
        ],
        [todolist2]: [
            {id: v1(), title: 'Rembo', isDone: true},
            {id: v1(), title: 'YouTube', isDone: false},
            {id: v1(), title: 'Avatar', isDone: true},
        ]
    })

    const changeTitleTask = (idTodol:string,taskId: string,editText:string) => {
        setTasks({...tasks,[idTodol]:tasks[idTodol].map(
            el=>el.id===taskId?{...el,title:editText}:el
            )})
    }


    const changeTitleTodolist = (idTodol:string,editText:string) => {
        setTodolists(todolists.map(e=>e.id===idTodol?{...e,title:editText}:e))
    }


    const createTodolist = (title:string) => {
        const newIdTodolist = v1()
        setTodolists([{
            id: newIdTodolist, title, filter: 'all'},...todolists])
        setTasks({...tasks,[newIdTodolist]:[]})
    }

    const deleteTodolist = (idTodol:string) => {
        setTodolists(todolists.filter(e=>e.id!==idTodol))
        delete tasks[idTodol]
        setTasks({...tasks})
    }


    const deleteTask = (idTodol:string,taskId: string) => {
        setTasks({...tasks,[idTodol]:tasks[idTodol].filter(
            e=>e.id!==taskId)})
    }


    const creatTask = (idTodol:string,titleTask: string) => {
        setTasks({...tasks,[idTodol]:[
            {id: v1(), title:titleTask, isDone: true},...tasks[idTodol]]})
    }


    const changeChekboxTask = (idTodol:string,taskId: string, valueChekbox: boolean) => {
        setTasks({...tasks,[idTodol]:tasks[idTodol].map(e=>e.id===taskId?{...e,isDone:valueChekbox}:e)})
    }


    const filtrationTasks = (idTodol:string,filterValue: filterValueType) => {
        setTodolists(todolists.map(el=>el.id===idTodol?{...el,filter:filterValue}:el))
    }



    return (
        <div >
            <HeaderAppBar/>
            <Container fixed>
                <Grid container style={{padding:'15px'}}>
            <AddItemForm callback = {createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
            {
                todolists.map(todol => {

                    let filterStateTasks = tasks[todol.id]
                    if (todol.filter === 'complited') {
                        filterStateTasks = tasks[todol.id].filter(elem => elem.isDone)
                    }
                    if (todol.filter === 'needToDo') {
                        filterStateTasks = tasks[todol.id].filter(elem => !elem.isDone)
                    }

                    return ( <Grid item>
                            <Paper style={{padding:'15px'}}>
                        <Todolist
                            changeTitleTask={changeTitleTask}
                            changeTitleTodolist={changeTitleTodolist}
                            deleteTodolist={deleteTodolist}
                            idTodol={todol.id}
                            key={todol.id}
                            filter={todol.filter}
                            changeChekboxTask={changeChekboxTask}
                            creatTask={creatTask}
                            filtrationTasks={filtrationTasks}
                            deleteTask={deleteTask}
                            title={todol.title}
                            filterStateTasks={filterStateTasks}/>
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

