import {authAPI, LoginParamsType} from "../api/api";
import {Dispatch} from "redux";
import {utilsFunctionRejectPromis} from "../utils/utilsForFunctionsThanks";
import {setStatusLoadingAC} from "./appReducer";

const initialState = {
    isLoggedIn: false
}
type initialStateType = {
    isLoggedIn: boolean
}

type ActionType = setValueIsLoggedType

export const loginReduser = (state: initialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-ISLOGGED-IN':{
            return {...state,isLoggedIn: action.value}
        }
        default:return state
    }
}

type setValueIsLoggedType = ReturnType<typeof setValueIsLogged>
export const setValueIsLogged = (value:boolean) => {
  return{
      type:'SET-ISLOGGED-IN',
      value
  }
}


export const loginTC = (payload:LoginParamsType) => (
    dispatch:Dispatch) => {
    dispatch(setStatusLoadingAC('loading'))
    authAPI.login(payload)
        .then((respons)=>{
            if(respons.resultCode===0){
                dispatch(setValueIsLogged(true))
            }  else   {
                utilsFunctionRejectPromis(respons.messages[0],dispatch)
            }

        })
        .catch((error) => {
            utilsFunctionRejectPromis(error.message,dispatch)
        })
}