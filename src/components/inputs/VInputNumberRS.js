import React, {useCallback}   from 'react'
import PropTypes   from 'prop-types'
import {Input}     from 'reactstrap'
import {vPropTypes, vDefaultProps} from './base/inputProps'
import {useInnerValue, withValium, withAddon} from './base'


const _VInputNumberRS = (props) => {
  const {id, name, inputRef, placeholder, 
    readOnly, required, min, max, step,
    pattern, valid, 
    autocomplete, inputStyle, onChange}= props

  const [innerValue, valueProps]= useInnerValue(props)

  const handleChange = useCallback((event) => {
    const value= event.target.value
    if (onChange!=undefined) {
      onChange(value)
    }
  }, [onChange])

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
            pattern     = {pattern}
            step        = {step || undefined}
            valid       = {innerValue!=undefined && innerValue!='' && valid}
            invalid     = {! valid}
            autoComplete= {autocomplete}
            style       = {inputStyle} 
            onChange    = {handleChange}
            {...valueProps}
    />
  )
}

/*

NOTE: we cannot do the transofrm here. or when typing decimal seps
  (for example "123,", will be transformed and the separator tailored)

const transform= {
  from: (n) => {
    if (n==undefined) {
      return ''
    }
    return n.toString()
  },
  to: (s) => {
    const f= parseFloat(s)
    if (isNaN(f)) {
      return undefined
    }
    return f
  }
}*/

const VInputNumberRS = withValium(withAddon(_VInputNumberRS), 'text')


VInputNumberRS.propTypes = {
  ...vPropTypes,
  defaultValue        : PropTypes.number,  
  placeholder         : PropTypes.string,
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  step                : PropTypes.number,
  pattern             : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
}

VInputNumberRS.defaultProps = {
  ...vDefaultProps,
  icon: 'dollar',
  inputFilter: 'float'
}

export default VInputNumberRS