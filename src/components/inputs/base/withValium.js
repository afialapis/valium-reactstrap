import React, {useRef} from 'react'
import {VInput} from 'valium'

const withValium = (BaseComponent, inputType) => (props) => {

  const {feedback, checkValue, allowedValues, disallowedValues, 
         doRepeat, doNotRepeat, prematureValidation, stepRange, 
         inputFilter, formActions} = props
  
  const setValidity= useRef(undefined)
    
  return (
    <VInput type               = {inputType}
            feedback           = {feedback} 
            checkValue         = {checkValue}
            allowedValues      = {allowedValues}
            disallowedValues   = {disallowedValues}
            doRepeat           = {doRepeat}
            doNotRepeat        = {doNotRepeat}
            prematureValidation= {prematureValidation}
            stepRange          = {stepRange}
            inputFilter        = {inputFilter}
            bindSetValidity    = {(f) => {setValidity.current= f}}
            formActions        = {formActions}
            render             = {({valid, message}, inputRef) => 
              <BaseComponent {...props}
                             valid       = {valid}
                             message     = {message}
                             inputRef    = {inputRef}
                             setValidity = {setValidity}/>
            }/>  
  )
}


export default withValium