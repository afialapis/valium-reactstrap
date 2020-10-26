import React from 'react'
import {VInputAddon}  from './VInputAddon'

const withAddon = BaseComponent => {
  
  const _withAddon = (props) => {

    let {name, 
         label, description, feedback, message, icon, 
         keepHeight, showAddon, showValidity,
        valid, inline,  formGroupStyle, 
        inputGroupStyle, middleElement, value, defaultValue} = props
    
    const showValidProps = showValidity>=2 
      ? {valid: valid, invalid: ! valid}
      : {}

    return (
      <VInputAddon name           = {name}
                   label          = {label}
                   description    = {description}
                   feedback       = {feedback||message}
                   value          = {value===undefined ? defaultValue : value}
                   icon           = {icon}
                   showAddon      = {showAddon}
                   showValidity   = {showValidity}
                   isValid        = {valid}
                   inline         = {inline}
                   keepHeight     = {keepHeight}
                   formGroupStyle = {formGroupStyle}
                   inputGroupStyle= {inputGroupStyle}
                   middleElement  = {middleElement}>

        <BaseComponent {...props}
                   showValidProps = {showValidProps}/>
        
      </VInputAddon>
    )
  }

  return _withAddon
}


export {withAddon}