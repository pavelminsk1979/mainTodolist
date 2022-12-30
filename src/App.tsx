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

const App = () => {

   /* const [filter, setFilter] = useState<filterValueType>('all')*/

    const todolist1 = v1();
    const todolist2 = v1();

    const [todolists, setTodolists] = useState<Array<StateTodolistType>>(
        [
            {id: todolist1, title: 'What to learn', filter: 'all'},
            {id: todolist2, title: 'What to watch', filter: 'all'}
        ]
    )

    const [tasks, setTasks] = useState({
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

    const filtrationTasks = (idTodol:string,filterValue: filterValueType) => {
        setTodolists(todolists.map(el=>el.id===idTodol?{...el,filter:filterValue}:el))
    }

    const changeChekboxTask = (taskId: string, valueChekbox: boolean) => {
        /*setTasks(tasks.map(el => el.id === taskId
            ? {...el, isDone: valueChekbox} : el))*/
    }

    const creatTask = (titleTask: string) => {
      /*  setTasks([{id: v1(), title: titleTask, isDone: true}, ...tasks])*/
    }

    const deleteTask = (taskId: string) => {
        /*setTasks(tasks.filter(el => el.id !== taskId))*/
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

