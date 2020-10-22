import React from 'react'
import {useInput} from 'valium'

const withValium = BaseComponent => {
  
  const _withValium = (props) => {
    const [inputRef, valid, message, setValidity]= useInput(props)

    return (
      <BaseComponent {...props}
                    valid       = {valid}
                    message     = {message}
                    inputRef    = {inputRef}
                    setValidity = {setValidity}/>
    )
  }

  return _withValium
}


export {withValium}