import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todolistReducer} from "./todolistReducer";
import thunk from 'redux-thunk';
import {appReducer} from "./appReducer";
import {loginReduser} from "./loginReducer";

const rootReducer = combineReducers({
    tasks:taskReducer,
    todolists:todolistReducer,
    app:appReducer,
    isLogin:loginReduser
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export type StateStoreType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store