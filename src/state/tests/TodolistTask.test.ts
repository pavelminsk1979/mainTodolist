
import {createTodolistAC, deleteTodolistAC, todolistReducer, TodolistType} from "../todolistReducer";
import {StateTasksType, taskReducer} from "../taskReducer";

test('ids should be equals', () => {
    const startTasksState: StateTasksType = {}
    const startTodolistsState: Array<TodolistType> = []

const action = createTodolistAC('New Title')


    const endTasksState = taskReducer(startTasksState,action )


    const endTodolistsState = todolistReducer(startTodolistsState, action )


    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.newId)
    expect(idFromTodolists).toBe(action.newId)
})


test('property with todolistId should be deleted', () => {
    const startState: StateTasksType = {
        'todolist1': [
            {id: '1', title: 'JS', isDone: true},
            {id: '2', title: 'HTML&CSS', isDone: true},
            {id: '3', title: 'React', isDone: true},
            {id: '4', title: 'English', isDone: false}
        ],
        'todolist2': [
            {id: '1', title: 'Rembo', isDone: true},
            {id: '2', title: 'YouTube', isDone: false},
            {id: '3', title: 'Avatar', isDone: true},
        ]
    }

    const endState = taskReducer(startState, deleteTodolistAC('todolist2'))


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})