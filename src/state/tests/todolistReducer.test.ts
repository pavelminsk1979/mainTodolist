import {v1} from "uuid";
import {StateTodolistType} from "../../App";
import {
    changeTitleTodolist,
    changeTodolistFilter,
    createTodolist,
    deleteTodolist,
    todolistReducer
} from "../todolistReducer";
import {filterValueType} from "../../Todolist";


test('correct todolist should be removed', () => {
    let todolist1 = v1()
    let todolist2 = v1()

    const startState: Array<StateTodolistType> = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to watch', filter: 'all'}
    ]

    const endState = todolistReducer(startState, deleteTodolist(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})


test('correct todolist should be added', () => {
    let todolist1 = v1()
    let todolist2 = v1()

    let newTitle = 'New Todolist'

    const startState: Array<StateTodolistType> = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to watch', filter: 'all'}
    ]

    const endState = todolistReducer(startState, createTodolist(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[2].title).toBe('What to watch')
})


test('correct todolist should change its name', () => {
    let todolist1 = v1()
    let todolist2 = v1()

    let newTitle = 'New Title'

    const startState: Array<StateTodolistType> = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to watch', filter: 'all'}
    ]

    const endState = todolistReducer(startState, changeTitleTodolist(todolist1,newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('What to watch')
})


test('correct filter of todolist should be changed', () => {
    let todolist1 = v1()
    let todolist2 = v1()

    let newFilter: filterValueType = 'complited'

    const startState: Array<StateTodolistType> = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to watch', filter: 'all'}
    ]

    const endState = todolistReducer(startState, changeTodolistFilter(todolist1,newFilter))

    expect(endState[0].filter).toBe('complited')
    expect(endState[1].filter).toBe('all')
})