import React, {useEffect} from 'react';
import HeaderAppBar from "./HeaderAppBar";
import {RootTodolist} from "./RootTodolist";
import {Login} from "./Login";
import {Routes, Route, Navigate} from 'react-router-dom';
import {initializeAppTC} from "./state/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateStoreType} from "./state/store";
import LinearProgress from "@mui/material/LinearProgress";


const App = () => {

    const aplicationInitialized = useSelector<StateStoreType, boolean>(state => state.app.initialized)
    const dispatch = useDispatch<any>()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!aplicationInitialized) {
        return <LinearProgress color="inherit" />
    }

        return (
            <div>
                <HeaderAppBar/>

                <Routes>
                    <Route path="/*" element={<RootTodolist/>}/>
                    <Route path="/login" element={<Login/>}/>
                    {/*<Route path="404" element={<h3>404: PAGE NOT FOUND</h3>}/>*/}
                    {/*<Route path="*" element={<h3>404: PAGE NOT FOUND</h3>}/>*/}
                </Routes>


            </div>
        );
}

export default App

