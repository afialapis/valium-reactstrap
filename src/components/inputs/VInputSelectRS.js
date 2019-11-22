import React            from 'react'
import PropTypes        from 'prop-types'
import VInputAddon      from './VInputAddon'
import {VInputSelect}   from 'valium'
import {Input}          from 'reactstrap'


const VInputSelectRS = ({name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, 
                      required, checkValue, allowedValues, disallowedValues, onChange, options}) => {

  let vprops= {}
  let nvalue= undefined
  if (defaultValue!=undefined) {
    vprops.defaultValue= defaultValue || ''
    nvalue= defaultValue
  } else {
    vprops.value= value
    nvalue= value
  }

  
  const sdisallowedValues= disallowedValues!=undefined ? disallowedValues.map((v) => v.toString()) : []
  let options_map= []
  
  for (const key in options) {
    options_map.push({
      value: key,
      label: options[key],
      disabled: sdisallowedValues.indexOf(key)>=0
    })
  }

  return (
    <VInputSelect feedback        = {feedback} 
                 checkValue      = {checkValue}
                 allowedValues   = {allowedValues}
                 disallowedValues= {disallowedValues}
                 render          = {({valid, message}, inputRef) => 
                 <VInputAddon name        = {name}
                             label       = {label}
                             feedback    = {feedback || message}
                             value       = {nvalue}
                             icon        = {icon || 'list-ul'}
                             isValid     = {valid}
                             inline      = {inline}>
                   <Input    name        = {name}
                             type        = "select"
                             className   = "custom-select"
                             innerRef    = {inputRef}
                             placeholder = {placeholder || ""}
                             onChange    = {(event) => {if (onChange!=undefined) { return onChange(event.target.value)}}}
                             readOnly    = {readOnly!=undefined ? readOnly  : false}
                             required    = {required}
                             valid       = {nvalue!=undefined && nvalue!='' && valid}
                             invalid     = {! valid}
                             {...vprops}>
                      {options_map.map((opt) => 
                        <option key={`${name}_option_${opt.value}`}
                                value={opt.value}
                                disabled={opt.disabled}
                                >
                          {opt.label}
                        </option>
                      )}
                   </Input>
                 </VInputAddon>

              }
    />
  )
}


VInputSelectRS.propTypes = {
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

export default VInputSelectRS