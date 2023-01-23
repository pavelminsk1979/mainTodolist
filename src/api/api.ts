import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b48cd3f5-7cda-4a22-b331-9292412429bd'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get <Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonTodolistType<{
            item: TodolistType }>>('todo-lists', {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonTodolistType>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, putAfterItemId: string) {
        return instance.put<CommonTodolistType>(`todo-lists/${todolistId}`, {putAfterItemId})
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<RequestTasks>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonTask<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonTask>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, modal: ModalType) {
        return instance.put<CommonTask<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, modal)
    }
}

type ModalType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string
}

type CommonTask<T = {}> = {
    messages: Array<string>
    resultCode: number
    data: T
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type RequestTasks = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Complete = 2,
    Draft = 3
}




export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CommonTodolistType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: string[]
    data: T
}

