import st from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";

type CommonCreateTitleType = {
    callback:(titleTask:string)=>void
}

export const AddItemForm = memo( (
    props:CommonCreateTitleType) => {
        console.log('******')
    const [titleTask, setTitleTask] = useState('')
    const [error, setError] = useState<null | string>(null)

    const creatTaskClickEnterHundler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            creatTaskHandler()
        }
    }

    const creatTitleForTaskHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.currentTarget.value)
        setError(null)
    }

    const creatTaskHandler = () => {
        if (titleTask.trim() !== '') {
            props.callback( titleTask.trim())
            setTitleTask('')
        } else {
            setError('Text is required')
        }

    }


  return(
      <div>
          <TextField
              error={!!error}
              size="small"
              onKeyPress={creatTaskClickEnterHundler}
              onChange={creatTitleForTaskHundler}
              value={titleTask}
              id="outlined-basic"
              variant="outlined" />

          <IconButton
              color="primary"
              onClick={creatTaskHandler}>
              <AddBox/>
          </IconButton>
        {error && <div className={st.error}>{error}</div>}
      </div>
  )
}
)