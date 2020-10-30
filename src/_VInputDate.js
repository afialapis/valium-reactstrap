import React, {useState, useEffect} from 'react'
import PropTypes   from 'prop-types'
import {useInput} from 'valium'
import {VInputAddon} from './addon/VInputAddon'
import DatePicker  from 'reactstrap-date-picker'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import isControlled from './helpers/isControlled'

const _VInputDate = (props) => {
  const {id, placeholder, readOnly, autocomplete, inline,
         label, description, feedback, icon, keepHeight, inputGroupStyle, formGroupStyle,
         required, inputStyle, onChange, transform,
         showValidity} = props

  const controlled= isControlled(props)
  const {value, defaultValue}= props
  const [innerValue, setInnerValue]= useState(controlled ? transform.toISO(value) : transform.toISO(defaultValue))

  const [inputRef, valid, message, _setValidity]= useInput({
    ...props,
    transformValue: transform.fromISO,
    checkValue: props.checkValue!=undefined 
                ? (v) => props.checkValue(transform.fromISO(v))
                : undefined
  })

  useEffect(() => {
    const nInnerValue= controlled ? transform.toISO(value) : transform.toISO(defaultValue)
    if (innerValue != nInnerValue) {
      setInnerValue(nInnerValue)
    }

  }, [innerValue, value, defaultValue, controlled, transform])
       
  
  const handleChange = (value, _formattedValue) => {
    setInnerValue(value)
    if (onChange!=undefined) {
      // TODO Ask RDP to expose event as a onChange() parameter,
      // so we can expose it here too
      onChange(transform.fromISO(value), undefined)
    }
  }

  const nInputGroupStyle ={
    ...inputGroupStyle,
    flexWrap: "unset"
  }

  return (
    <VInputAddon name           = {name}
                 label          = {label}
                 description    = {description}
                 feedback       = {feedback||message}
                 value          = {innerValue}
                 icon           = {icon}
                 showValidity   = {showValidity}                 
                 isValid        = {valid}
                 inline         = {inline}
                 keepHeight     = {keepHeight}
                 inputGroupStyle= {nInputGroupStyle}
                 formGroupStyle = {formGroupStyle}
                 >

      <DatePicker 
                  id          = {id}
                  weekStartsOn= {1} 
                  placeholder = {placeholder}
                  inputRef    = {inputRef}
                  dateFormat  = {"DD/MM/YYYY"}
                  readOnly    = {readOnly}
                  required    = {required}
                  autocomplete= {autocomplete}
                  className   = {(showValidity==1 || showValidity==4) ? valid ? 'is-valid' : 'is-invalid' : ''}
                  style       = {inputStyle} 
                  value       = {innerValue}
                  onChange    = {(v,f) => handleChange(v, f)}
      />
    </VInputAddon>
  )
}


const VInputDate= _VInputDate
  

VInputDate.propTypes = {
  ...inputPropTypes,
  placeholder         : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
  transform           : PropTypes.object
}

VInputDate.defaultProps = {
  ...inputDefaultProps,
  icon       : 'calendar',
  inputStyle : {} // invalidate the r-d-p width default
}


export default VInputDate