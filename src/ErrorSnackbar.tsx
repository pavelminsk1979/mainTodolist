
import React from "react";
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {StateStoreType} from "./state/store";
import {errorSnackbarShowAC, errorSnackbarType} from "./state/appReducer";
import {useDispatch, useSelector} from "react-redux";

const Alert = React.forwardRef<HTMLDivElement,
    AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert
        elevation={6}
        ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const dispatch = useDispatch<any>()
    const error = useSelector<StateStoreType,errorSnackbarType>(
        state=>state.app.errorSnackbar)

    const handleClose = (event?: React.SyntheticEvent
        | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(errorSnackbarShowAC(null))
    }
    return (
        <Snackbar
            open={error!==null}
            autoHideDuration={5000}
            onClose={handleClose}>
            <Alert onClose={handleClose}
                   severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}