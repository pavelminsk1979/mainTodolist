import st from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type CommonCreateTitleType = {
    callback:(titleTask:string)=>void
}

export const AddItemForm = (props:CommonCreateTitleType) => {

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
        <input className={error ? st.frame : ''}
               onKeyPress={creatTaskClickEnterHundler}
               onChange={creatTitleForTaskHundler}
               value={titleTask}/>
        <button onClick={creatTaskHandler}>+</button>
        {error && <div className={st.error}>{error}</div>}
      </div>
  )
}