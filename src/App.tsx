import React, {useState} from 'react';
import './App.css';
import {filterValueType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id:string
    title:string
    isDone:boolean
}

const App = () => {

    const [filter,setFilter] = useState('all')

    const [tasks,setTasks] = useState( [
        {id:v1(),title:'JS',isDone:true},
        {id:v1(),title:'HTML&CSS',isDone:true},
        {id:v1(),title:'React',isDone:true},
        {id:v1(),title:'English',isDone:false}
    ])

    const creatTask = (titleTask:string) => {
        setTasks([{id:v1(),title:titleTask,isDone:true},...tasks])
    }

    const deleteTask = (taskId:string) => {
        setTasks(tasks.filter(el=>el.id!==taskId))
    }

    const filtrationTasks = (filterValue: filterValueType) => {
        setFilter(filterValue)
    }
    let filterStateTasks=tasks
    if(filter==='complited'){
        filterStateTasks=tasks.filter(elem=>elem.isDone)
    } if (filter==='needToDo'){
        filterStateTasks=tasks.filter(elem=>!elem.isDone)
    }

    return (
        <div className="App">
            <Todolist
                creatTask={creatTask}
                filtrationTasks={filtrationTasks}
                deleteTask={deleteTask}
                title='What to learn'
                filterStateTasks={filterStateTasks}/>
        </div>
    );
}

export default App

