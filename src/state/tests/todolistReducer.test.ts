import {v1} from "uuid";
import {
    changeTitleTodolistAC,
    changeTodolistFilterAC, CompleteTodolistType,
    createTodolistAC,
    deleteTodolistAC, filterValueType,
    todolistReducer
} from "../todolistReducer";



let todolist1:string
let todolist2:string

let  startState: Array<CompleteTodolistType>

beforeEach(() => {
     todolist1 = v1()
     todolist2 = v1()

     startState = [
    {id: todolist1, title: 'What to learn', filter: 'all', addedDate:'',
        order:0},
    {id: todolist2, title: 'What to watch', filter: 'all', addedDate:'',
        order:0}
]
})



test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, deleteTodolistAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})



test('correct todolist should be added', () => {

    let newTitle = 'New Todolist'

    const endState = todolistReducer(startState, createTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[2].title).toBe('What to watch')
})


test('correct todolist should change its name', () => {

    let newTitle = 'New Title'

    const endState = todolistReducer(startState, changeTitleTodolistAC(todolist1,newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('What to watch')
})


test('correct filter of todolist should be changed', () => {

    let newFilter: filterValueType = 'complited'


    const endState = todolistReducer(startState, changeTodolistFilterAC(todolist1,newFilter))

    expect(endState[0].filter).toBe('complited')
    expect(endState[1].filter).toBe('all')
})