import {taskReducer} from "../../state/taskReducer";
import {todolistReducer} from "../../state/todolistReducer";
import {combineReducers, legacy_createStore} from "redux";
import {Provider} from "react-redux";
import React from 'react';
import {v1} from "uuid";
import {StateStoreType} from "../../state/store";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as StateStoreType)

export const ReduxStoreProviderDecorator = (storyFn: ()=>JSX.Element) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)