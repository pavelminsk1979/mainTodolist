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
        return instance.get<TodolistType>('todo-lists')
    },
    createTodolist(title:string) {
        return instance.post<CommonTodolistType<{item:TodolistType}>>('todo-lists',{title});
    },
    deleteTodolist(todolistId:string) {
        return instance.delete<CommonTodolistType>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId:string,putAfterItemId:string) {
        return instance.put<CommonTodolistType>(`todo-lists/${todolistId}`,{putAfterItemId})
    }
}

type TodolistType = {
    id:string
    title:string
    addedDate:string
    order:number
}

type CommonTodolistType<T={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: string[]
    data: T
}

