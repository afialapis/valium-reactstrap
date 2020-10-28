import React, {useRef, useCallback, useState, useEffect}  from 'react'
import PropTypes   from 'prop-types'
import {useInput} from 'valium'
import {Input, InputGroupAddon, InputGroupText}     from 'reactstrap'
import {VInputAddon}  from './addon/VInputAddon'
import Icon from './icons'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import isControlled from './helpers/isControlled'
import {useInputFilter} from 'valium'

const wrappedCheckValue = (props, value) => {
  if (props.checkValue!=undefined) {
    if (!props.checkValue(value)) {
      return false
    }
  }
  if (props.gt!=undefined) {
    if (value<= props.gt) {
      return false
    }
  }
  if (props.lt!=undefined) {
    if (value>= props.lt) {
      return false
    }
  }
  return true
}


const VInputNumber = (props) => {
  const {id, name, placeholder, label, description, feedback,
         icon, inline, keepHeight, showAddon, formGroupStyle,
        inputGroupStyle, middleElement, 
         readOnly, required, min, max, step, decimals,
         autocomplete, onChange, t, inputFilter,
         inputStyle, showArrows, showValidity}= props
  
  const [inputRef, valid, message, setValidity]= useInput({
    ...props,
    checkValue: (v) => wrappedCheckValue(props, t.to(v))
  })

  const reprRef = useRef(undefined)

  const controlled= isControlled(props)

  const {value, defaultValue}= props

  const [innerValue, setInnerValue]= useState(controlled ? value : defaultValue)
  const [innerRepr, setInnerRepr]= useState(t.from(innerValue))

  useInputFilter(reprRef, inputFilter)

  useEffect(() => {
    const nInnerValue= controlled ? value : defaultValue
    if (innerValue != nInnerValue) {
      setInnerValue(nInnerValue)
      setInnerRepr(t.from(nInnerValue))
    }

  }, [innerValue, value, defaultValue, controlled, t])


  const updValue = useCallback((value, repr) => {
    inputRef.current.value= value
    setInnerValue(value)
    setInnerRepr(repr)

    if (onChange!=undefined) {
      onChange(value)
    }
    setValidity()
  }, [inputRef, setInnerValue, onChange, setValidity])

  const incrValue = useCallback((factor) => {
      const curValue = innerValue || 0.0
      const incr= step!=undefined
                  ? step
                  : 1.00
      let nValue= curValue + (factor*incr)
      updValue(nValue, t.from(nValue))
  }, [updValue, innerValue, step, t])


  const handleChange = useCallback((event) => {
    const value= event.target.value
    updValue(t.to(value), value)
  }, [updValue, t])


  const handleKeyDown = useCallback((event) => {
    if (event.key=='ArrowUp' || event.key=='ArrowDown') {
      event.preventDefault()
      const factor = event.key=='ArrowUp' ? 1 : -1
      incrValue(factor)
    }
  }, [incrValue])

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



      <input  type         = "number"
              id           = {id}
              name         = {name}
              ref          = {inputRef}
              style        = {{display: "none"}}
              required     = {required}
              max          = {max}
              min          = {min}
              decimals     = {decimals}
              defaultValue = {innerValue||''}/>

      <Input  
              type         = {"text"}
              innerRef     = {reprRef}
              placeholder  = {placeholder || ""}
              readOnly     = {readOnly!=undefined ? readOnly  : false}
              autoComplete = {autocomplete}
              style        = {inputStyle} 
              onKeyDown    = {(ev) => handleKeyDown(ev)}
              value        = {innerRepr}
              onChange     = {handleChange}
              {...showValidProps}
      />
      {showArrows
        ?  <InputGroupAddon className={`valium-reactstrap-input-number-addon ${readOnly ? 'read-only' : ''}`}
                            addonType= "append">
            <InputGroupText className="valium-reactstrap-input-number-incr"
                            onClick = {() => incrValue(-1)}>
              <Icon icon="minus"></Icon>
            </InputGroupText>
            <InputGroupText className="valium-reactstrap-input-number-incr"
                            onClick  = {() => incrValue(1)}>
              <Icon icon="plus"></Icon>
            </InputGroupText>
          </InputGroupAddon>  
        : null
      }      
    </VInputAddon>
  )
}


VInputNumber.propTypes = {
  ...inputPropTypes,
  defaultValue        : PropTypes.number,  
  placeholder         : PropTypes.string,
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  step                : PropTypes.number,
  gt                  : PropTypes.number,
  lt                  : PropTypes.number,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
  showArrows          : PropTypes.bool,
}


VInputNumber.defaultProps = {
  ...inputDefaultProps,
  showArrows: true
}

export default VInputNumber