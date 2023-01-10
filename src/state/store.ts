import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todolistReducer} from "./todolistReducer";

const rootReducer = combineReducers({
    tasks:taskReducer,
    todolists:todolistReducer
})

export const store = legacy_createStore(rootReducer)

export type StateStoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store