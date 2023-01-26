
import {
    changeChekboxTaskAC,
    changeTitleTaskAC,
    createTaskAC,
    deleteTaskAC,
    StateTasksType,
    taskReducer
} from "../taskReducer";
import {createTodolistAC} from "../todolistReducer";
import {TaskStatuses} from "../../api/api";

let startState:StateTasksType

beforeEach(()=>{
    startState = {
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
})


test('correct task should be deleted from correct array', () => {

    const endState = taskReducer(startState, deleteTaskAC('todolist2','2'))


    expect(endState).toEqual({
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
            {id: '3', title: 'Avatar', status:TaskStatuses.Complete, todoListId:'todolist2',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1}
        ]
    })
})



test('correct task should be added to correct array', () => {

    const endState = taskReducer(startState,createTaskAC('todolist2','Shrek') )

    expect(endState['todolist1'].length).toBe(4)
    expect(endState['todolist2'].length).toBe(4)
    expect(endState['todolist2'][0].id).toBeDefined()
    expect(endState['todolist2'][0].title).toBe('Shrek')
    expect(endState['todolist2'][0].status).toBe(false)
})




test('status of specified task should be changed', () => {

    const endState = taskReducer(startState,changeChekboxTaskAC('todolist2','1',TaskStatuses.New) )


    expect(endState['todolist2'][0].status).toBe(false)
    expect(endState['todolist1'][0].status).toBe(true)
})



test('correct task should change its name', () => {

    const endState = taskReducer(startState,changeTitleTaskAC('todolist2','1','Rembo 3') )


    expect(endState['todolist2'][0].title).toBe('Rembo 3')
})



test('new array should be added when new todolist is added', () => {

    const endState = taskReducer(startState, createTodolistAC('New Title'))


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolist1' && k != 'todolist2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})