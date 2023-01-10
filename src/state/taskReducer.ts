
import {createTodolistType, deleteTodolistType} from "./todolistReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type StateTasksType = {
    [key : string] : Array<TaskType>
}

const initialState:StateTasksType={}

export const taskReducer = (state: StateTasksType=initialState,
                            action: ActionsType): StateTasksType => {
    switch (action.type) {
        case 'DELETE-TASK': {
            return {
                ...state, [action.todolId]: state[action.todolId].filter(
                    e => e.id !== action.taskId)
            }
        }
        case "CREATE-TASK":{
            return {...state,[action.todolId]:[
                    {id: '4', title: action.title, isDone: false},...state[action.todolId]
                ]}
        }
        case 'CHANGE-CHEKBOX-TASK':{
            return {...state,[action.todolId]:state[action.todolId].map(
                e=>e.id===action.taskId?{...e,isDone:action.isDone}:e
                )}
        }
        case "CHANGE-TITLE-TASK":{
            return {...state,[action.todolId]:state[action.todolId].map(
                e=>e.id===action.taskId?{...e,title:action.title}:e
                )}
        }

        case "DELETE-TODOLIST":{
             delete state[action.todolistId]
            return {...state}
        }

        case "CREATE-TODOLIST":{
            return {...state,[action.newId]:[]}
        }

        default:
            return state
    }
}


type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (todolId: string,taskId : string,title:string
) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        todolId,
        taskId,
        title
    } as const
}


type changeChekboxTaskACType = ReturnType<typeof changeChekboxTaskAC>
export const changeChekboxTaskAC = (todolId: string,taskId : string,isDone:boolean
) => {
    return {
        type: 'CHANGE-CHEKBOX-TASK',
        todolId,
        taskId,
        isDone
    } as const
}


type createTaskACType = ReturnType<typeof createTaskAC>
export const createTaskAC = (todolId: string,title : string) => {
    return {
        type: 'CREATE-TASK',
        todolId,
        title
    } as const
}


type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolId: string, taskId: string) => {
    return {
        type: 'DELETE-TASK',
        todolId,
        taskId
    } as const
}


type ActionsType = deleteTaskACType
    | createTaskACType
    | changeChekboxTaskACType
    | changeTitleTaskACType
    | deleteTodolistType
    | createTodolistType


