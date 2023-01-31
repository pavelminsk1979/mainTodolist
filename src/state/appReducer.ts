

export type StatusLoadingType = 'idle' | 'loading' | 'failed'
export type errorSnackbarType = null|string

const initialState:initialStateType = {
    statusLoading: 'idle',
    /*загрузка будет показыватся если statusLoading  будет  'loading'*/
    errorSnackbar:null
}

type initialStateType = {
    statusLoading:StatusLoadingType
    errorSnackbar:errorSnackbarType
}


export const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'SET-STATUSLOADING' : {
            return {...state,statusLoading:action.statusLoading}
        }
        case "ERROR-SNACKBAR-SHOW":{
            return {...state,errorSnackbar:action.error}
        }
        default:
            return state
    }
}


export type errorSnackbarShowACType=ReturnType<typeof errorSnackbarShowAC>

export const errorSnackbarShowAC = (error:errorSnackbarType) =>{
    return{
        type: 'ERROR-SNACKBAR-SHOW',
        error
    }as const
}


export type  setStatusLoadingACType = ReturnType<typeof setStatusLoadingAC>
export const setStatusLoadingAC = (statusLoading: StatusLoadingType) => {
    return {
        type: 'SET-STATUSLOADING',
        statusLoading
    } as const
}

type ActionType = setStatusLoadingACType|errorSnackbarShowACType