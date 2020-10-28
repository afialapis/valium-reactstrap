import React from 'react'
import PropTypes   from 'prop-types'
import {useInput} from 'valium'
import {VInputAddon} from './addon/VInputAddon'
import DatePicker  from 'reactstrap-date-picker'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {useInnerValueWithTransform} from './value/useInnerValueWithTransform'

const toISOString = (value) => {
  if (typeof value == 'string' && value.length>0) {

    if (value=='today') {
      const today= new Date()
      const date= new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
      return date.toISOString()
    }

    const getDateFromEu = (s) => {
      const parts= s.split('/')
      const year= parseInt(parts[2])
      const month= parseInt(parts[1])-1
      const day= parseInt(parts[0])
      const date= new Date(Date.UTC(year, month, day))
      return date.toISOString()      
    }
    
    const getDateFromIso = (s) => {
      const parts= s.split('-')
      const year= parseInt(parts[0])
      const month= parseInt(parts[1])-1
      const day= parseInt(parts[2])
      const date= new Date(Date.UTC(year, month, day))
      return date.toISOString()      
    }

    try {
      return getDateFromEu(value)
    } catch(_) {
      return getDateFromIso(value)
    }
  }
  return undefined
}



const _VInputDate = (props) => {
  const {id, placeholder, readOnly, autocomplete, inline,
         label, description, feedback, icon, keepHeight, inputGroupStyle, formGroupStyle,
         required, inputStyle, onChange, 
         showAddon, showValidity} = props

  const [inputRef, valid, message, _setValidity]= useInput({
    ...props,
    checkValue: props.checkValue!=undefined 
                ? (v) => props.checkValue(toISOString(v))
                : undefined
  })
      

  const [innerValue, setInnerValue, controlled] = useInnerValueWithTransform(props, toISOString)

  const valueProps= controlled 
    ? {value   : innerValue} 
    : {defaultValue: innerValue}

  
  const handleChange = (value, formattedValue) => {
    const isoValue= toISOString(formattedValue)
    setInnerValue(isoValue)
    if (onChange!=undefined) {
      // TODO Ask RDP to expose event as a onChange() parameter,
      // so we can expose it here too
      onChange(isoValue, undefined)
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
                 showAddon      = {showAddon}
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
                  className   = {showValidity>=2 ? valid ? 'is-valid' : 'is-invalid' : ''}
                  style       = {inputStyle} 
                  onChange    = {(v,f) => handleChange(v, f)}
                  {...valueProps} 
      />
    </VInputAddon>
  )
}


const VInputDate= _VInputDate
  

VInputDate.propTypes = {
  ...inputPropTypes,
  placeholder         : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"])
}

VInputDate.defaultProps = {
  ...inputDefaultProps,
  icon       : 'calendar',
  inputStyle : {} // invalidate the r-d-p width default
}


export default VInputDate