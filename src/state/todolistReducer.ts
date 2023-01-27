import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";


export type filterValueType = 'all' | 'complited' | 'needToDo'
export type CompleteTodolistType = TodolistType & {
    filter: filterValueType
}

const initialState: Array<CompleteTodolistType> = []


export const todolistReducer = (state: Array<CompleteTodolistType> = initialState,
                                action: ActionsType): Array<CompleteTodolistType> => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(e => e.id !== action.todolistId)
        }
        case "CREATE-TODOLIST": {
            return [{id: action.newId, title: action.newTitle, filter: 'all',addedDate:'',order:0}, ...state]
        }
        case "CHANGE-TITLE-TODOLIST": {
            return state.map(e => e.id === action.todolist1
                ? {...e, title: action.newTitle} : e)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(e => e.id === action.todolist1
                ? {...e, filter: action.newFilter} : e)
        }
        case "SET-TODOLIST": {
            return action.responsData.map(el => ({...el, filter: 'all'}))
        }
        default:
            return state
    }
}

type changeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolist1: string, newFilter: filterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolist1,
        newFilter
    } as const
}


type changeTitleTodolistType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (todolist1: string, newTitle: string) => {
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

export type  setTodolistACType = ReturnType<typeof setTodolistAC>
export const setTodolistAC = (responsData: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLIST',
        responsData
    } as const
}




export const changeTitleTodolistTC = (todolistId: string, title: string) => (dispatch:Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then((respons) => {
            dispatch(changeTitleTodolistAC(todolistId,title))
        })
}


export const createTodolistTC = (title: string) => (dispatch:Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((respons) => {
            dispatch(createTodolistAC(title))
        })
}


export const deleteTodolistTC = (todolistId: string) => (dispatch:Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((respons) => {
            dispatch(deleteTodolistAC(todolistId))
        })
}


export const setTodolist = () => (dispatch:Dispatch) => {
    todolistAPI.getTodolists()
        .then((respons) => {
            dispatch(setTodolistAC(respons.data))
        })
}

type ActionsType = deleteTodolistType
    | createTodolistType
    | changeTitleTodolistType
    | changeTodolistFilterType
    | setTodolistACType


