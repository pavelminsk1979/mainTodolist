

import {CompleteTodolistType, createTodolistAC, deleteTodolistAC, todolistReducer} from "../todolistReducer";
import {StateTasksType, taskReducer} from "../taskReducer";
import {TaskStatuses} from "../../api/api";

test('ids should be equals', () => {
    const startTasksState: StateTasksType = {}
    const startTodolistsState: Array<CompleteTodolistType> = []

const action = createTodolistAC('todolist3','New Title')


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
            {id: '1', title: 'JS',status:TaskStatuses.Complete, todoListId:'todolist1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '2', title: 'HTML&CSS', status:TaskStatuses.Complete, todoListId:'todolist1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '3', title: 'React', status:TaskStatuses.Complete, todoListId:'todolist1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '4', title: 'English', status:TaskStatuses.New, todoListId:'todolist1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1}
        ],
        'todolist2': [
            {id: '1', title: 'Rembo', status:TaskStatuses.Complete, todoListId:'todolist2',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '2', title: 'YouTube', status:TaskStatuses.New, todoListId:'todolist2',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: '3', title: 'Avatar', status:TaskStatuses.Complete, todoListId:'todolist2',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
        ]
    }

    const endState = taskReducer(startState, deleteTodolistAC('todolist2'))


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})