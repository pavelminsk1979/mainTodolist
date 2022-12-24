import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id:number
    title:string
    isDone:boolean
}

const App = () => {

    const tasks = [
        {id:1,title:'JS',isDone:true},
        {id:2,title:'HTML&CSS',isDone:true},
        {id:3,title:'React',isDone:true},
        {id:4,title:'English',isDone:false}
    ]

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasks}/>
        </div>
    );
}

export default App

