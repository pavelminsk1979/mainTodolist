import React from 'react';
import HeaderAppBar from "./HeaderAppBar";
import {RootTodolist} from "./RootTodolist";
import {Login} from "./Login";
import { Routes,Route, Navigate } from 'react-router-dom';




const App = () => {

    return (
        <div>
            <HeaderAppBar/>

            <Routes>
                <Route path="/" element={<RootTodolist/>}/>
                <Route path="login" element={ <Login/>}/>
                <Route path="404" element={<h3>404: PAGE NOT FOUND</h3>}/>
                <Route path="*" element={<Navigate to ="/404" />}/>
            </Routes>


        </div>
    );
}

export default App

