import React, {useState, useEffect}       from 'react'
import PropTypes   from 'prop-types'
import VInputAddon from './base/VInputAddon'
import DatePicker  from 'reactstrap-date-picker'
import {vPropTypes, vDefaultProps} from './base/inputProps'
import {withValium} from './base'

const checkControlledValue = (props, toISOString) => {
  if (Object.keys(props).indexOf('defaultValue')>=0) {
    return [toISOString(props.defaultValue), {defaultValue: toISOString(props.defaultValue)}]
  }
  return [toISOString(props.value), {value: toISOString(props.value)}]
}

const _toISOString = (value) => {
  if (typeof value == 'string' && value.length>0) {

    if (value=='today') {
      const today= new Date()
      const date= new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
      return date.toISOString()
    }

    const parts= value.split('/')
    const year= parseInt(parts[2])
    const month= parseInt(parts[1])-1
    const day= parseInt(parts[0])
    const date= new Date(Date.UTC(year, month, day))
    return date.toISOString()
  }
  return undefined
}


const _VInputDateRS = (props) => {
  const {id, placeholder, readOnly, autocomplete, inline,
         label, feedback, message, icon, keepHeight, inputGroupStyle, formGroupStyle,
         required, inputStyle, toISOString, onChange, setValidity,
         inputRef, valid, value, defaultValue} = props

  const [innerValue, setInnerValue]= useState(checkControlledValue(props, toISOString)[0])
  const [innerProps, setInnerProps]= useState(checkControlledValue(props, toISOString)[1])

  useEffect(() => {
    const [nInnerValue, nInnerProps]= checkControlledValue(props, toISOString)

    if (nInnerProps!=innerProps) {
      setInnerProps(nInnerProps)
    }
    if (nInnerValue!=innerValue) {
      setInnerValue(nInnerValue)
    }
  }, [value, defaultValue])

  useEffect(() => {
    if (setValidity && setValidity.current) {
      setValidity.current()
    }
  }, [innerValue])

  const handleChange = (value, formattedValue) => {
    if (setValidity && setValidity.current) {
      setValidity.current()
    }
    onChange(formattedValue)
  }

  const nInputGroupStyle ={
    ...inputGroupStyle,
    flexWrap: "unset"
  }


  return (
    <VInputAddon name           = {name}
                 label          = {label}
                 feedback       = {feedback==='no-feedback' ? undefined : feedback||message}
                 value          = {innerValue}
                 icon           = {icon}
                 isValid        = {valid}
                 inline         = {inline}
                 keepHeight     = {keepHeight}
                 inputGroupStyle= {nInputGroupStyle}
                 formGroupStyle = {formGroupStyle}
                 >

      <DatePicker.default id          = {id}
                  weekStartsOn= {1} 
                  placeholder = {placeholder}
                  inputRef    = {inputRef}
                  dateFormat  = {"DD/MM/YYYY"}
                  readOnly    = {readOnly}
                  required    = {required}
                  autocomplete= {autocomplete}
                  className   = {valid ? 'is-valid' : 'is-invalid'}
                  style       = {inputStyle} 
                  onChange    = {(v,f) => handleChange(v, f)}
                  {...innerProps} 
      />
    </VInputAddon>
  )
}


const VInputDateRS= withValium(_VInputDateRS, 'text')
  

VInputDateRS.propTypes = {
  ...vPropTypes,
  prematureValidation : PropTypes.bool,
  placeholder         : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
  toISOString         : PropTypes.func
}

VInputDateRS.defaultProps = {
  ...vDefaultProps,
  icon       : 'calendar',
  toISOString: _toISOString,
  inputStyle : {} // invalidate the r-d-p width default
}


export default VInputDateRS