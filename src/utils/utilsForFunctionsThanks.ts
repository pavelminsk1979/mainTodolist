import {Dispatch} from "redux";
import {
    errorSnackbarShowAC,
    errorSnackbarShowACType,
    setStatusLoadingAC,
    setStatusLoadingACType
} from "../state/appReducer";
import {CommonTask} from "../api/api";


export const utilsFunctionShowError = (data:CommonTask,dispatch:ErrorUtilsDispatchType) => {
    if (data.messages.length){
        dispatch(errorSnackbarShowAC(data.messages[0]))
    }  else  {
        dispatch(errorSnackbarShowAC('Some Error'))
    }
    dispatch(setStatusLoadingAC('idle'))
}


export const utilsFunctionRejectPromis = (message:string,dispatch:ErrorUtilsDispatchType) => {
    dispatch(setStatusLoadingAC('idle'))
    dispatch(errorSnackbarShowAC(message))
}



type ErrorUtilsDispatchType = Dispatch<setStatusLoadingACType|errorSnackbarShowACType>