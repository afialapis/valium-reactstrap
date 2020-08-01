import React        from 'react'
import PropTypes    from 'prop-types'
import VInputAddon  from './VInputAddon'
import {VInput}     from 'valium'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './common/inputProps'
import useInnerValue   from './common/useInnerValue'


const VInputTextRS = (props) => {
  const {formActions, id, name, value, defaultValue, label, feedback, icon, inline, 
    inputType, placeholder, readOnly, autocomplete, required, maxLength, minLength, 
    pattern, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, onChange, onConfirm,
    prematureValidation, keepHeight, formGroupStyle, inputGroupStyle, inputStyle} = props
  

  const [innerValue, innerProps]= useInnerValue(props)
  
  return (
    <VInput type            = "text"
            feedback        = {feedback} 
            checkValue      = {checkValue}
            allowedValues   = {allowedValues}
            disallowedValues= {disallowedValues}
            doRepeat             = {doRepeat}
            doNotRepeat          = {doNotRepeat}
            prematureValidation= {prematureValidation}
            formActions     = {formActions}
            render  = {({valid, message}, inputRef) => 
              <VInputAddon name          = {name}
                          label          = {label}
                          feedback       = {feedback==='no-feedback' ? undefined : feedback||message}
                          value          = {innerValue}
                          icon           = {icon}
                          isValid        = {valid}
                          inline         = {inline}
                          keepHeight     = {keepHeight}
                          formGroupStyle = {formGroupStyle}
                          inputGroupStyle= {inputGroupStyle}>
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
                        {...innerProps}
                />
              </VInputAddon>

              }
    />
  )
}


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