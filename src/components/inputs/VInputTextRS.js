import React        from 'react'
import PropTypes    from 'prop-types'
import VInputAddon  from './VInputAddon'
import {VInput}     from 'valium'
import {Input}      from 'reactstrap'


const VInputTextRS = ({id, name, value, defaultValue, label, feedback, icon, inline, inputType, placeholder, readOnly, 
                      required, maxLength, minLength, pattern, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup}) => {

  let vprops= {}
  let nvalue= undefined
  if (defaultValue!=undefined) {
    vprops.defaultValue= defaultValue || ''
    nvalue= defaultValue
  } else {
    vprops.value= value
    nvalue= value
  }
  
  return (
    <VInput type            = "text"
            feedback        = {feedback} 
            checkValue      = {checkValue}
            allowedValues   = {allowedValues}
            disallowedValues= {disallowedValues}
            checkValidityOnKeyup= {checkValidityOnKeyup}
            render  = {({valid, message}, inputRef) => 
              <VInputAddon name        = {name}
                          label       = {label}
                          feedback    = {feedback || message}
                          value       = {nvalue}
                          icon        = {icon || 'align-justify'}
                          isValid     = {valid}
                          inline      = {inline}>
                <Input  id          = {id}
                        name        = {name}
                        innerRef    = {inputRef}
                        type        = {inputType || "text"}
                        placeholder = {placeholder || ""}
                        onChange    = {(event) => {if (onChange!=undefined) { return onChange(event.target.value)}}}
                        readOnly    = {readOnly!=undefined ? readOnly  : false}
                        required    = {required}
                        maxLength   = {maxLength}
                        minLength   = {minLength}
                        pattern     = {pattern}
                        valid       = {nvalue!=undefined && nvalue!='' && valid}
                        invalid     = {! valid}
                        {...vprops}
                />
              </VInputAddon>

              }
    />
  )
}


VInputTextRS.propTypes = {
  id                  : PropTypes.string,
  name                : PropTypes.string.isRequired,
  value               : function(props, _propName, _componentName) {
      if (! ('value' in props) && ! ('defaultValue' in props)) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  defaultValue        : PropTypes.string,
  label               : PropTypes.string,
  feedback            : PropTypes.string,
  icon                : PropTypes.string,
  inline              : PropTypes.bool,
  inputType           : PropTypes.string,
  placeholder         : PropTypes.string,
  readOnly            : PropTypes.bool,
  required            : PropTypes.bool,
  maxLength           : PropTypes.number,
  minLength           : PropTypes.number,
  pattern             : PropTypes.string,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  checkValidityOnKeyup: PropTypes.bool,
  onChange            : PropTypes.func,
}

export default VInputTextRS