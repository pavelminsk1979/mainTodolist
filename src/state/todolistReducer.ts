import {todolistAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";
import {errorSnackbarShowAC, setStatusLoadingAC, setStatusLoadingACType} from "./appReducer";


export type filterValueType = 'all' | 'complited' | 'needToDo'
export type CompleteTodolistType = TodolistType & {
    filter: filterValueType,
    disableStatus: boolean
}

const initialState: Array<CompleteTodolistType> = []


export const todolistReducer = (state: Array<CompleteTodolistType> = initialState,
                                action: ActionsType): Array<CompleteTodolistType> => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(e => e.id !== action.todolistId)
        }
        case "CREATE-TODOLIST": {
            return [{
                id: action.newId,
                title: action.newTitle,
                filter: 'all',
                addedDate: '',
                order: 0,
                disableStatus: false
            }, ...state]
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
            return action.responsData.map(el => ({...el, filter: 'all', disableStatus: false}))
        }
        case "CHANGE-DISABLE-STATUS":{
            return state.map(el=>el.id===action.todolistId
                ?{...el,disableStatus:action.disableStatus}:el)
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
export const createTodolistAC = (newId: string, newTitle: string) => {
    return {
        type: 'CREATE-TODOLIST',
        newTitle,
        newId
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

export type  changeDisableStatusACType = ReturnType<typeof changeDisableStatusAC>
export const changeDisableStatusAC = (todolistId:string,disableStatus:boolean) => {
    return {
        type: 'CHANGE-DISABLE-STATUS',
        disableStatus,
        todolistId
    } as const
}


export const changeTitleTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusLoadingAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then((respons) => {
            dispatch(changeTitleTodolistAC(todolistId, title))
            dispatch(setStatusLoadingAC('idle'))
        })
}


export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusLoadingAC('loading'))
    todolistAPI.createTodolist(title)
        .then((respons) => {
            if (respons.data.resultCode === 0) {
                dispatch(createTodolistAC(respons.data.data.item.id, title))
                dispatch(setStatusLoadingAC('idle'))
            } else {
                if (respons.data.messages.length) {
                    dispatch(errorSnackbarShowAC(respons.data.messages[0]))
                } else {
                    dispatch(errorSnackbarShowAC('Some Error'))
                }
                dispatch(setStatusLoadingAC('idle'))
            }

        })
}


export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusLoadingAC('loading'))
    dispatch(changeDisableStatusAC(todolistId,true))
    todolistAPI.deleteTodolist(todolistId)
        .then((respons) => {
            dispatch(deleteTodolistAC(todolistId))
            dispatch(setStatusLoadingAC('idle'))
            dispatch(changeDisableStatusAC(todolistId,false))
        })
}


export const setTodolist = () => (dispatch: Dispatch) => {
    dispatch(setStatusLoadingAC('loading'))
    todolistAPI.getTodolists()
        .then((respons) => {
            dispatch(setTodolistAC(respons.data))
            dispatch(setStatusLoadingAC('idle'))
        })
}

type ActionsType = deleteTodolistType
    | createTodolistType
    | changeTitleTodolistType
    | changeTodolistFilterType
    | setTodolistACType
    | changeDisableStatusACType



