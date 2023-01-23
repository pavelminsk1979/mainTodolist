import st from "./Todolist.module.css";
import Checkbox from "@mui/material/Checkbox";
import {EditTitle} from "./EditTitle";
import IconButton from "@mui/material/IconButton";
import DeleteSweep from "@mui/icons-material/DeleteSweep";
import React, {ChangeEvent} from "react";
import {TaskStatuses, TaskType} from "./api/api";


type PropsTaskType = {
    task: TaskType
    deleteTask: (taskId: string) => void
    changeTitleTask: (taskId: string, editText: string) => void
    changeChekboxTask: (taskId: string, valueChekbox: boolean) => void

}

export const Task = (props: PropsTaskType) => {

    const deleteTaskHundler = () => {
        props.deleteTask(props.task.id)
    }

    const changeTitleTaskHundler = (editText: string) => {
        props.changeTitleTask(props.task.id, editText)
    }

    const changeChekboxTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeChekboxTask(props.task.id, event.currentTarget.checked)
    }

    return (
        <div className={props.task.status===TaskStatuses.Complete ? st.isDone : ''}>
            <Checkbox
                size="small"
                checked={props.task.status===TaskStatuses.Complete}
                onChange={changeChekboxTaskHandler}
            />
            <EditTitle
                title={props.task.title}
                callback={changeTitleTaskHundler}/>
            <IconButton
                size="small"
                color="primary"
                onClick={deleteTaskHundler}>
                <DeleteSweep/>
            </IconButton>
        </div>
    )
}