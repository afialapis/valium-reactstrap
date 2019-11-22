import React            from 'react'
import PropTypes        from 'prop-types'
import VInputAddon      from './VInputAddon'
import {VInputDate}     from 'valium'
import {Input}          from 'reactstrap'


const VInputDateRS = ({name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, 
                      required, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup}) => {

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
    <VInputDate feedback        = {feedback} 
               checkValue      = {checkValue}
               allowedValues   = {allowedValues}
               disallowedValues= {disallowedValues}
               checkValidityOnKeyup= {checkValidityOnKeyup}
               render  = {({valid, message}, inputRef) => 
                 <VInputAddon name        = {name}
                             label       = {label}
                             feedback    = {feedback || message}
                             value       = {nvalue}
                             icon        = {icon || 'calendar'}
                             isValid     = {valid}
                             inline      = {inline}>
                   <Input  name        = {name}
                           innerRef    = {inputRef}
                           type        = {"text"}
                           placeholder = {placeholder || ""}
                           onChange    = {(event) => {if (onChange!=undefined) { return onChange(event.target.value)}}}
                           readOnly    = {readOnly!=undefined ? readOnly  : false}
                           required    = {required}
                           pattern     = {"(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).(19|20)[0-9]{2}"}
                           valid       = {nvalue!=undefined && nvalue!='' && valid}
                           invalid     = {! valid}
                           {...vprops}
                   />
                 </VInputAddon>

              }
    />
  )
}


VInputDateRS.propTypes = {
  name                : PropTypes.string.isRequired,
  value               : function(props, _propName, _componentName) {
      if (props['defaultValue'] == undefined && props['value'] == undefined) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  defaultValue        : function(props, _propName, _componentName) {
    if (props['defaultValue'] == undefined && props['value'] == undefined) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  label               : PropTypes.string,
  feedback            : PropTypes.string,
  icon                : PropTypes.string,
  inline              : PropTypes.bool,
  placeholder         : PropTypes.string,
  readOnly            : PropTypes.bool,
  required            : PropTypes.bool,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  checkValidityOnKeyup: PropTypes.bool,
  onChange            : PropTypes.func,
}

export default VInputDateRS