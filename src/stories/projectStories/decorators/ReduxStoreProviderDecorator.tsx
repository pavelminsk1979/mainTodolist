import {taskReducer} from "../../../state/taskReducer";
import {todolistReducer} from "../../../state/todolistReducer";
import {combineReducers, legacy_createStore} from "redux";
import {Provider} from "react-redux";
import React from 'react';
import {v1} from "uuid";
import {StateStoreType} from "../../../state/store";
import {TaskStatuses} from "../../../api/api";
import {appReducer} from "../../../state/appReducer";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app:appReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate:'', order:0,disableStatus:false},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate:'', order:0,disableStatus:false}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'JS',status:TaskStatuses.Complete, todoListId:'todolistId1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: v1(), title: 'HTML&CSS', status:TaskStatuses.Complete, todoListId:'todolistId1',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Rembo', status:TaskStatuses.Complete, todoListId:'todolistId2',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
            {id: v1(), title: 'YouTube', status:TaskStatuses.New, todoListId:'todolistId2',description:'',startDate:'',deadline:'',
                addedDate:'',order:0, priority:1},
        ]
    },
    app : {
        statusLoading: 'idle',
        errorSnackbar:'ТРЯМ-С!'
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as StateStoreType)

export const ReduxStoreProviderDecorator = (storyFn: ()=>JSX.Element) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)