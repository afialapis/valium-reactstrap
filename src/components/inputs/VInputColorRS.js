import React            from 'react'
import PropTypes        from 'prop-types'
import VInputAddon      from './VInputAddon'
import {VInputColor}    from 'valium'
import {Input}          from 'reactstrap'


const VInputColorRS = ({name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, 
                      required, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup}) => {

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
    <VInputColor feedback        = {feedback} 
               checkValue      = {checkValue}
               allowedValues   = {allowedValues}
               disallowedValues= {disallowedValues}
               checkValidityOnKeyup= {checkValidityOnKeyup}
               render  = {({valid, message}, inputRef) => 
                 <VInputAddon name        = {name}
                             label       = {label}
                             feedback    = {feedback || message}
                             value       = {nvalue}
                             icon        = {icon || 'paint-brush'}
                             isValid     = {valid}
                             inline      = {inline}>
                   <Input  name        = {name}
                           innerRef    = {inputRef}
                           type        = {"color"}
                           placeholder = {placeholder || ""}
                           onChange    = {(event) => {if (onChange!=undefined) { return onChange(event.target.value)}}}
                           readOnly    = {readOnly!=undefined ? readOnly  : false}
                           required    = {required}
                           valid       = {nvalue!=undefined && nvalue!='' && valid}
                           invalid     = {! valid}
                           {...vprops}
                   />
                 </VInputAddon>

              }
    />
  )
}


VInputColorRS.propTypes = {
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

export default VInputColorRS