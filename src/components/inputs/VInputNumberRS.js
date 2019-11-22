import React            from 'react'
import PropTypes        from 'prop-types'
import VInputAddon      from './VInputAddon'
import {VInputNumber}   from 'valium'
import {Input}          from 'reactstrap'


const VInputNumberRS = ({name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, 
                      required, max, min, pattern, step, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup}) => {

  let vprops= {}
  let nvalue= undefined
  if (defaultValue!=undefined) {
    vprops.defaultValue= defaultValue || undefined
    nvalue= defaultValue
  } else {
    vprops.value= value
    nvalue= value
  }
  
  return (
    <VInputNumber feedback        = {feedback} 
               checkValue      = {checkValue}
               allowedValues   = {allowedValues}
               disallowedValues= {disallowedValues}
               checkValidityOnKeyup= {checkValidityOnKeyup}
               render  = {({valid, message}, inputRef) => 
                 <VInputAddon name        = {name}
                             label       = {label}
                             feedback    = {feedback || message}
                             value       = {nvalue}
                             icon        = {icon || 'dollar-sign'}
                             isValid     = {valid}
                             inline      = {inline}>
                   <Input  name        = {name}
                           innerRef    = {inputRef}
                           type        = {"number"}
                           placeholder = {placeholder || ""}
                           onChange    = {(event) => {if (onChange!=undefined) { return onChange(event.target.value)}}}
                           readOnly    = {readOnly!=undefined ? readOnly  : false}
                           required    = {required}
                           max         = {max}
                           min         = {min}
                           pattern     = {pattern}
                           step        = {step || undefined}
                           valid       = {nvalue!=undefined && nvalue!='' && valid}
                           invalid     = {! valid}
                           {...vprops}
                   />
                 </VInputAddon>

              }
    />
  )
}


VInputNumberRS.propTypes = {
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
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  pattern             : PropTypes.string,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  checkValidityOnKeyup: PropTypes.bool,
  onChange            : PropTypes.func,
}

export default VInputNumberRS