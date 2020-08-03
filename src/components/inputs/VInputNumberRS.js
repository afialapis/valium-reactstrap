import React   from 'react'
import PropTypes   from 'prop-types'
import {Input}     from 'reactstrap'
import {vPropTypes, vDefaultProps} from './common/inputProps'
import {withValue, withValium, withAddon} from './base'


const _VInputNumberRS = (props) => {
  const {id, name, inputRef, placeholder, 
    readOnly, required, min, max, step,
    pattern, innerValue, innerProps, valid, 
    autocomplete, inputStyle}= props

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
            {...innerProps}
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

const VInputNumberRS = withValue(withValium(withAddon(_VInputNumberRS), 'text') /*, transform*/)


VInputNumberRS.propTypes = {
  ...vPropTypes,
  defaultValue        : PropTypes.number,  
  prematureValidation : PropTypes.bool,
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
  inputFilter: value => /^-?\d*[.,]?\d*$/.test(value)
}

export default VInputNumberRS