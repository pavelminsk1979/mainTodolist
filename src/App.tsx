import React, {useState} from 'react';
import './App.css';
import {filterValueType, Todolist} from "./Todolist";

export type TaskType = {
    id:number
    title:string
    isDone:boolean
}

const App = () => {

    const [filter,setFilter] = useState('all')

    const [tasks,setTasks] = useState( [
        {id:1,title:'JS',isDone:true},
        {id:2,title:'HTML&CSS',isDone:true},
        {id:3,title:'React',isDone:true},
        {id:4,title:'English',isDone:false}
    ])

    const deleteTask = (taskId:number) => {
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
                filtrationTasks={filtrationTasks}
                deleteTask={deleteTask}
                title='What to learn'
                filterStateTasks={filterStateTasks}/>
        </div>
    );
}

export default App

