import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {setValueIsLogged} from "./loginReducer";
import {utilsFunctionRejectPromis} from "../utils/utilsForFunctionsThanks";
import {whenLogoutAllDataDelite} from "./todolistReducer";


export type StatusLoadingType = 'idle' | 'loading' | 'failed'
export type errorSnackbarType = null | string

const initialState: initialStateType = {
    statusLoading: 'idle',
    /*загрузка будет показыватся если statusLoading  будет  'loading'*/
    errorSnackbar: null,
    initialized: false  /*при обнавлении приложения этот флаг остановит выполнение
                         App компоненты если false тогда  покажет пользователю загрузку, далее-ME-запрос
                            и неважно какой ответ с этого запроса НО загрузку надо удрать  поэтому
                            initialized установится в true ////если  придет с сервера ответ на ME-запрос
                         что  правильная кука тогда с сервера придет ответ  виде логина и пароля и айдишки.....и буду использовать dispatch(setValueIsLogged(true)) чтобы не
                         перекидывала на станицу с полями для залогинивании*/
}

type initialStateType = {
    statusLoading: StatusLoadingType
    errorSnackbar: errorSnackbarType
    initialized: boolean
}


export const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'SET-STATUSLOADING' : {
            return {...state, statusLoading: action.statusLoading}
        }
        case "ERROR-SNACKBAR-SHOW": {
            return {...state, errorSnackbar: action.error}
        }
        case "SET-INITIALIZED": {
            return {...state, initialized: action.value}
        }
        default:
            return state
    }
}

type setAppInitialisedACType = ReturnType<typeof setAppInitialisedAC>
export const setAppInitialisedAC = (value: boolean) => {
    return {
        type: 'SET-INITIALIZED',
        value
    } as const
}


export type errorSnackbarShowACType = ReturnType<typeof errorSnackbarShowAC>

export const errorSnackbarShowAC = (error: errorSnackbarType) => {
    return {
        type: 'ERROR-SNACKBAR-SHOW',
        error
    } as const
}


export type  setStatusLoadingACType = ReturnType<typeof setStatusLoadingAC>
export const setStatusLoadingAC = (statusLoading: StatusLoadingType) => {
    return {
        type: 'SET-STATUSLOADING',
        statusLoading
    } as const
}

export const deleteLoginTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusLoadingAC('loading'))
    authAPI.deleteLogin()
        .then((respons) => {
            if (respons.data.resultCode === 0) {
                dispatch(setValueIsLogged(false))
                dispatch(whenLogoutAllDataDelite())
            } else {
                utilsFunctionRejectPromis(respons.data.messages[0], dispatch)
            }
        })
        .catch((error) => {
            utilsFunctionRejectPromis(error.message, dispatch)
        })
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusLoadingAC('loading'))
    authAPI.me()
        .then(respons => {
            if (respons.data.resultCode === 0) {
                dispatch(setValueIsLogged(true))
            } else {
                utilsFunctionRejectPromis(respons.data.messages[0], dispatch)
            }
        })
        .catch((error) => {
            utilsFunctionRejectPromis(error.message, dispatch)
        })
        .finally(() => {
            dispatch(setAppInitialisedAC(true))
        })
}

type ActionType = setStatusLoadingACType | errorSnackbarShowACType | setAppInitialisedACType