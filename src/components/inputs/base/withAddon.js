import React from 'react'
import VInputAddon  from './VInputAddon'

const withAddon = BaseComponent => {
  
  const _withAddon = (props) => {

    let {name, label, feedback, message, icon, 
        valid, inline, keepHeight, formGroupStyle, 
        inputGroupStyle, middleElement, value, defaultValue} = props
    
    return (
      <VInputAddon name           = {name}
                  label          = {label}
                  feedback       = {feedback==='no-feedback' ? undefined : feedback||message}
                  value          = {value===undefined ? defaultValue : value}
                  icon           = {icon}
                  isValid        = {valid}
                  inline         = {inline}
                  keepHeight     = {keepHeight}
                  formGroupStyle = {formGroupStyle}
                  inputGroupStyle= {inputGroupStyle}
                  middleElement  = {middleElement}>

        <BaseComponent {...props}/>
        
      </VInputAddon>
    )
  }

  return _withAddon
}


export default withAddon