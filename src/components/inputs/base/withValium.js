import React, {useRef} from 'react'
import {useValium} from 'valium'

const withValium = (BaseComponent, inputType) => {
  
  const _withValium = (props) => {

    const setValidity= useRef(undefined)

    const [inputRef, valid, message]= useValium({
      ...props,
      type: inputType,
      bindSetValidity: (f) => { setValidity.current= f }
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