import {ChangeEvent, useState} from "react";

type EditTitleType = {
  title:string
  callback:(editText:string)=>void
}

export const EditTitle = (props:EditTitleType) => {

const [changeRender,setChangeRender]=useState(true)

  const [editText,setEditText] =useState(props.title)


  const onChangeHundler = (event:ChangeEvent<HTMLInputElement>) => {
    setEditText(event.currentTarget.value)
  }

  const onDoubleClickHundler = () => {
    setChangeRender(false)
  }

  const onBlurHundler = () => {
  props.callback(editText)
    setChangeRender(true)
  }


  return(
      changeRender
      ?<span
          onDoubleClick={onDoubleClickHundler}
          >{props.title}</span>
    :<input
          onChange={onChangeHundler}
          onBlur={onBlurHundler}
          autoFocus
          value={editText}
          />
  )
}