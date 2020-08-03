import React        from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './base/inputProps'

import {withValue, withValium, withAddon} from './base'


const _VInputTextRS = (props) => {
  const {id, name, inputRef, inputType, placeholder, 
         readOnly, required, maxLength, minLength, 
         pattern, innerValue, innerProps, valid, 
         autocomplete, inputStyle}= props
  
  return (
    <Input  id          = {id}
            name        = {name}
            innerRef    = {inputRef}
            type        = {inputType || "text"}
            placeholder = {placeholder || ""}
            readOnly    = {readOnly!=undefined ? readOnly  : false}
            required    = {required}
            maxLength   = {maxLength}
            minLength   = {minLength}
            pattern     = {pattern}
            valid       = {innerValue!=undefined && innerValue!='' && valid}
            invalid     = {! valid}
            autoComplete= {autocomplete}
            style       = {inputStyle} 
            {...innerProps}/>
   )
}


const VInputTextRS= withValue(withValium(withAddon(_VInputTextRS), 'text'))


VInputTextRS.propTypes = {
  ...vPropTypes,

  prematureValidation : PropTypes.bool,  
  inputType    : PropTypes.string,
  placeholder  : PropTypes.string,
  maxLength    : PropTypes.number,
  minLength    : PropTypes.number,
  pattern      : PropTypes.string,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputTextRS.defaultProps = {
  ...vDefaultProps,
  icon: 'text'
}


export default VInputTextRS