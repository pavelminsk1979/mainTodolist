import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch} from "react-redux";
import {deleteLoginTC} from "./state/appReducer";

export default function HeaderAppBar() {
    const dispatch = useDispatch<any>()
    
    const deleteLoginHandler = () => {
      dispatch(deleteLoginTC())
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TODOLIST
                    </Typography>
                    <span>localhost:3000/3001/pavelminsk1979@mail.ru/1979@pav</span>
                    <Button 
                        onClick={deleteLoginHandler}
                        color="inherit">LOG OUT</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}