import {createTodolistType, deleteTodolistType, setTodolistAC, setTodolistACType} from "./todolistReducer";
import {ModalType, tasksAPI, TaskStatuses, TaskType, todolistAPI} from "../api/api";
import {Dispatch} from "redux";
import {StateStoreType} from "./store";


export type StateTasksType = {
    [key: string]: Array<TaskType>
}

const initialState: StateTasksType = {}

export const taskReducer = (state: StateTasksType = initialState,
                            action: ActionsType): StateTasksType => {
    switch (action.type) {
        case 'DELETE-TASK': {
            return {
                ...state, [action.todolId]: state[action.todolId].filter(
                    e => e.id !== action.taskId)
            }
        }
        case "CREATE-TASK": {
            return {
                ...state, [action.todolId]: [
                    {   description: '',
                        title: action.title,
                        status: TaskStatuses.New,
                        priority: 0,
                        startDate: '',
                        deadline: '',
                        id: action.taskId,
                        todoListId: action.todolId,
                        order: 0,
                        addedDate: ''}, ...state[action.todolId]
                ]
            }
        }
        case 'CHANGE-CHEKBOX-TASK': {
            return {
                ...state, [action.todolId]: state[action.todolId].map(
                    e => e.id === action.taskId ? {...e, status: action.status} : e
                )
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state, [action.todolId]: state[action.todolId].map(
                    e => e.id === action.taskId ? {...e, title: action.title} : e
                )
            }
        }

        case "DELETE-TODOLIST": {
            delete state[action.todolistId]
            return {...state}
        }

        case "CREATE-TODOLIST": {
            return {...state, [action.newId]: []}
        }
        case "SET-TODOLIST": {
            let copyState = {...state}
            action.responsData.map(todolist => {
                return copyState[todolist.id] = []
            })
            return copyState
        }
        case "SET-TASK":{
          let copyStateTasks = {...state}
            copyStateTasks[action.todolistId]=action.tasks
            return copyStateTasks
        }

        default:
            return state
    }
}


type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (todolId: string, taskId: string, title: string
) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        todolId,
        taskId,
        title
    } as const
}


type changeChekboxTaskACType = ReturnType<typeof changeChekboxTaskAC>
export const changeChekboxTaskAC = (todolId: string, taskId: string, status: TaskStatuses
) => {
    return {
        type: 'CHANGE-CHEKBOX-TASK',
        todolId,
        taskId,
        status
    } as const
}


type createTaskACType = ReturnType<typeof createTaskAC>
export const createTaskAC = (todolId: string,taskId: string, title: string) => {
    return {
        type: 'CREATE-TASK',
        todolId,
        taskId,
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

type setTaskACType = ReturnType<typeof setTaskAC>
export const setTaskAC = (todolistId:string,tasks:Array<TaskType>) => {
    return {
        type: 'SET-TASK',
        todolistId,
        tasks
    } as const
}


export const changeChekboxTaskTC = (todolistId: string, taskId: string, status: boolean) => (dispatch: Dispatch, getState:()=>StateStoreType) => {
    const state = getState()
    const allTasks = state.tasks
    const taskForTodolist = allTasks[todolistId]
    const task = taskForTodolist.find(e=>e.id===taskId)
    let newStatus:TaskStatuses
    if(status===true){
        newStatus=TaskStatuses.Complete
    } else {newStatus = TaskStatuses.New}
    if(task){
        tasksAPI.updateTaskTitle(todolistId, taskId,{
            title: task.title,
            description: task.description,
            status: newStatus,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        })
            .then((respons) => {
                dispatch(changeChekboxTaskAC(todolistId, taskId, newStatus))
            })
    }
}



export const changeTitleTaskTC = (todolistId: string, taskId: string, editText: string) => (dispatch: Dispatch, getState:()=>StateStoreType) => {
    const state = getState()
    const allTasks = state.tasks
    const taskForTodolist = allTasks[todolistId]
    const task = taskForTodolist.find(e=>e.id===taskId)
if(task){
    tasksAPI.updateTaskTitle(todolistId, taskId,{
        title: editText,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    })
        .then((respons) => {
            dispatch(changeTitleTaskAC(todolistId, taskId, editText))
        })
}
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then((respons) => {
            dispatch(createTaskAC(todolistId,respons.data.data.item.id,title))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then((respons) => {
            dispatch(deleteTaskAC(todolistId,taskId))
        })
}


export const setTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then((respons) => {
            dispatch(setTaskAC(todolistId,respons.data.items))
        })
}


type ActionsType = deleteTaskACType
    | createTaskACType
    | changeChekboxTaskACType
    | changeTitleTaskACType
    | deleteTodolistType
    | createTodolistType
    | setTodolistACType
    | setTaskACType


