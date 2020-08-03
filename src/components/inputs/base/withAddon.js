import React from 'react'
import VInputAddon  from './VInputAddon'

const withAddon = BaseComponent => (props) => {

  let {name, label, feedback, message, innerValue, icon, 
       valid, inline, keepHeight, formGroupStyle, 
       inputGroupStyle, middleElement } = props
  
  return (
    <VInputAddon name           = {name}
                 label          = {label}
                 feedback       = {feedback==='no-feedback' ? undefined : feedback||message}
                 value          = {innerValue}
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


export default withAddon