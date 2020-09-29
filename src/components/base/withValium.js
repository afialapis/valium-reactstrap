import React from 'react'
import {useValiumInput} from 'valium'

const withValium = (BaseComponent, inputType) => {
  
  const _withValium = (props) => {
    const [inputRef, valid, message, setValidity]= useValiumInput({
      ...props,
      type: inputType
    })
      
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


export default withValium