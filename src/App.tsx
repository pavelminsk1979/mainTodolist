import React, {useState} from 'react';
import './App.css';
import {filterValueType, Todolist} from "./Todolist";
import {v1} from "uuid";

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
        <div className="App">
            {
                todolists.map(todol => {

                    let filterStateTasks = tasks[todol.id]
                    if (todol.filter === 'complited') {
                        filterStateTasks = tasks[todol.id].filter(elem => elem.isDone)
                    }
                    if (todol.filter === 'needToDo') {
                        filterStateTasks = tasks[todol.id].filter(elem => !elem.isDone)
                    }

                    return (
                        <Todolist
                            idTodol={todol.id}
                            key={todol.id}
                            filter={todol.filter}
                            changeChekboxTask={changeChekboxTask}
                            creatTask={creatTask}
                            filtrationTasks={filtrationTasks}
                            deleteTask={deleteTask}
                            title={todol.title}
                            filterStateTasks={filterStateTasks}/>
                    )
                })
            }

        </div>
    );
}

export default App

