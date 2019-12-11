import React, {useRef, useEffect}       from 'react'
import PropTypes   from 'prop-types'
import VInputAddon from './VInputAddon'
import {VInput}    from 'valium'
import DatePicker  from 'reactstrap-date-picker'
import VInputTypes from './common/VInputTypes'
import valueOrDef  from './common/valueOrDef'


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

const VInputDateRS = ({formActions, id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
                      required, checkValue, allowedValues, disallowedValues, keepHeight, formGroupStyle, inputGroupStyle, toISOString, onChange, prematureValidation}) => {
  
  const setValidity= useRef(undefined)
  
  useEffect(() => {
    setValidity.current()
  }, [value, defaultValue])

  const handleChange = (value, formattedValue) => {
    setValidity.current()
    onChange(formattedValue)
  }


  const [vprops, nvalue]= valueOrDef(toISOString(value), toISOString(defaultValue))

  const nInputGroupStyle ={
    ...inputGroupStyle,
    flexWrap: "unset"
  }

  return (
    <VInput type            = {"text"} 
            feedback        = {feedback} 
            checkValue      = {checkValue}
            allowedValues   = {allowedValues}
            disallowedValues= {disallowedValues}
            prematureValidation= {prematureValidation}
            bindSetValidity = {(f) => {setValidity.current= f}}
            formActions     = {formActions}
            render  = {({valid, message}, inputRef) => 
              <VInputAddon name        = {name}
                          label         = {label}
                          feedback      = {feedback || message}
                          value         = {nvalue}
                          icon          = {icon}
                          isValid       = {valid}
                          inline        = {inline}
                          keepHeight    = {keepHeight}
                          inputGroupStyle= {nInputGroupStyle}
                          formGroupStyle = {formGroupStyle}
                          >
                <DatePicker id          = {id}
                            onChange    = {(v,f) => handleChange(v, f)} 
                            weekStartsOn= {1} 
                            placeholder = {placeholder}
                            inputRef    = {inputRef}
                            dateFormat  = {"DD/MM/YYYY"}
                            readOnly    = {readOnly}
                            required    = {required}
                            autocomplete= {autocomplete}
                            
                            {...vprops} />
              </VInputAddon>
              }/>
  )
}


VInputDateRS.propTypes = {
  ...VInputTypes,
  prematureValidation : PropTypes.bool,
  placeholder         : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
  toISOString         : PropTypes.func
}

VInputDateRS.defaultProps = {
  icon       : 'calendar',
  toISOString: _toISOString,
  prematureValidation: true
}


export default VInputDateRS