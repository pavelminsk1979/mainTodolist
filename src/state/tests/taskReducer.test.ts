
import {StateTasksType} from "../../App";
import {changeChekboxTaskAC, changeTitleTaskAC, createTaskAC, deleteTaskAC, taskReducer} from "../taskReducer";
import {createTodolist, todolistReducer} from "../todolistReducer";

test('correct task should be deleted from correct array', () => {

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

    const endState = taskReducer(startState, deleteTaskAC('todolist2','2'))


    expect(endState).toEqual({
        'todolist1': [
            {id: '1', title: 'JS', isDone: true},
            {id: '2', title: 'HTML&CSS', isDone: true},
            {id: '3', title: 'React', isDone: true},
            {id: '4', title: 'English', isDone: false}
        ],
        'todolist2': [
            {id: '1', title: 'Rembo', isDone: true},
            {id: '3', title: 'Avatar', isDone: true},
        ]
    })
})

test('correct task should be added to correct array', () => {
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

    const endState = taskReducer(startState,createTaskAC('todolist2','Shrek') )

    expect(endState['todolist1'].length).toBe(4)
    expect(endState['todolist2'].length).toBe(4)
    expect(endState['todolist2'][0].id).toBeDefined()
    expect(endState['todolist2'][0].title).toBe('Shrek')
    expect(endState['todolist2'][0].isDone).toBe(false)
})


test('status of specified task should be changed', () => {
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

    const endState = taskReducer(startState,changeChekboxTaskAC('todolist2','1',false) )


    expect(endState['todolist2'][0].isDone).toBe(false)
    expect(endState['todolist1'][0].isDone).toBe(true)
})

test('correct task should change its name', () => {
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

    const endState = taskReducer(startState,changeTitleTaskAC('todolist2','1','Rembo 3') )


    expect(endState['todolist2'][0].title).toBe('Rembo 3')
})



test('new array should be added when new todolist is added', () => {
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

    const endState = taskReducer(startState, createTodolist('New Title'))


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolist1' && k != 'todolist2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})