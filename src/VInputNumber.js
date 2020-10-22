import React, {useCallback}   from 'react'
import PropTypes   from 'prop-types'
import {Input}     from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {useInnerValue} from './value/useInnerValue'
import {withValium} from './valium/withValium'


const _VInputNumber = (props) => {
  const {id, name, inputRef, placeholder, 
         readOnly, required, min, max, step, decimals,
         valid, autocomplete, onChange,
         inputStyle}= props


  const [innerValue, setInnerValue, controlled] = useInnerValue(props)

  const updValue = useCallback((value) => {
    setInnerValue(value)
    if (onChange!=undefined) {
      let v= value
      try {
        v= parseFloat(v)
      } catch(_) {}
      onChange(v)
    }

  }, [setInnerValue, onChange])

  const handleChange = useCallback((event) => {
    const value= event.target.value
    updValue(value)

  }, [updValue])

  const handleKeyDown = useCallback((event) => {
    if (event.key=='ArrowUp' || event.key=='ArrowDown') {
      event.preventDefault()
      let curValue = 0
      try {
        curValue= parseFloat(innerValue)
      } catch(_) {}
      const incr= step!=undefined
                  ? step
                  : 1.00
      const factor = event.key=='ArrowUp' ? 1 : -1
      let nValue= curValue + (factor*incr)
      if (decimals!=undefined && nValue.toFixed!=undefined) {
        nValue = nValue.toFixed(decimals)
      }
      updValue(nValue)
    }
  }, [updValue, innerValue, step, decimals])


  const valueProps= controlled 
    ? {value   : innerValue,
       onChange: handleChange
      } 
    : {defaultValue: innerValue}
    

  return (
    <Input  id          = {id}
            name        = {name}
            innerRef    = {inputRef}
            type        = {"text"}
            placeholder = {placeholder || ""}
            readOnly    = {readOnly!=undefined ? readOnly  : false}
            required    = {required}
            max         = {max}
            min         = {min}
            step        = {step}
            valid       = {valid}
            invalid     = {! valid}
            autoComplete= {autocomplete}
            style       = {inputStyle} 
            onKeyDown   = {(ev) => handleKeyDown(ev)}
            {...valueProps}
    />
  )
}


const VInputNumber = withValium(withAddon(_VInputNumber))


VInputNumber.propTypes = {
  ...inputPropTypes,
  defaultValue        : PropTypes.number,  
  placeholder         : PropTypes.string,
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  step                : PropTypes.number,
  //pattern             : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
}

VInputNumber.defaultProps = {
  ...inputDefaultProps,
  icon: 'dollar',
  inputFilter: 'float'
}

export default VInputNumber