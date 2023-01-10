
import {v1} from "uuid";
import {filterValueType} from "../Todolist";

export type TodolistType = {
    id: string
    title: string
    filter: filterValueType
}

const initialState:Array<TodolistType>=[]


export const todolistReducer = (state: Array<TodolistType>=initialState,
                                action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(e => e.id !== action.todolistId)
        }
        case "CREATE-TODOLIST": {
            return [{id: action.newId, title: action.newTitle, filter: 'all'}, ...state]
        }
        case "CHANGE-TITLE-TODOLIST":{
            return state.map(e=>e.id===action.todolist1
            ?{...e,title:action.newTitle}:e)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return state.map(e=>e.id===action.todolist1
            ?{...e,filter:action.newFilter}:e)
        }
        default:
            return state
    }
}

type changeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolist1:string, newFilter:filterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolist1,
        newFilter
    } as const
}


type changeTitleTodolistType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (todolist1:string, newTitle:string) => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        todolist1,
        newTitle
    } as const
}


export type createTodolistType = ReturnType<typeof createTodolistAC>
export const createTodolistAC = (newTitle: string) => {
    return {
        type: 'CREATE-TODOLIST',
        newTitle,
        newId: v1()
    } as const
}

export type  deleteTodolistType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        todolistId
    } as const
}

type ActionsType = deleteTodolistType
    | createTodolistType
    | changeTitleTodolistType
    | changeTodolistFilterType


