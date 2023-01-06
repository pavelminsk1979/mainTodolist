import {StateTodolistType} from "../App";
import {v1} from "uuid";
import {filterValueType} from "../Todolist";


export const todolistReducer = (
    state: Array<StateTodolistType>, action: ActionsType): Array<StateTodolistType> => {
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

type changeTodolistFilterType = ReturnType<typeof changeTodolistFilter>
export const changeTodolistFilter = (todolist1:string,newFilter:filterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolist1,
        newFilter
    } as const
}


type changeTitleTodolistType = ReturnType<typeof changeTitleTodolist>
export const changeTitleTodolist = (todolist1:string,newTitle:string) => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        todolist1,
        newTitle
    } as const
}


type createTodolistType = ReturnType<typeof createTodolist>
export const createTodolist = (newTitle: string) => {
    return {
        type: 'CREATE-TODOLIST',
        newTitle,
        newId: v1()
    } as const
}

type  deleteTodolistType = ReturnType<typeof deleteTodolist>
export const deleteTodolist = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        todolistId
    } as const
}

type ActionsType = deleteTodolistType
    | createTodolistType
    | changeTitleTodolistType
    | changeTodolistFilterType


