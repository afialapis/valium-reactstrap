import React        from 'react'
import PropTypes    from 'prop-types'
import VInputAddon  from './VInputAddon'
import {VInput}     from 'valium'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './common/VInputProps'
import valueOrDef   from './common/valueOrDef'


const VInputTextRS = (
  {formActions, id, name, value, defaultValue, label, feedback, icon, inline, 
    inputType, placeholder, readOnly, autocomplete, required, maxLength, minLength, 
    pattern, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, onChange, 
    prematureValidation, keepHeight, formGroupStyle, inputGroupStyle, inputStyle}) => {

  const [vprops, nvalue]= valueOrDef(value, defaultValue)
  
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
                          value          = {nvalue}
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
                        onChange    = {(event) => {if (onChange!=undefined) { return onChange(event.target.value)}}}
                        readOnly    = {readOnly!=undefined ? readOnly  : false}
                        required    = {required}
                        maxLength   = {maxLength}
                        minLength   = {minLength}
                        pattern     = {pattern}
                        valid       = {nvalue!=undefined && nvalue!='' && valid}
                        invalid     = {! valid}
                        autoComplete= {autocomplete}
                        style       = {inputStyle} 
                        {...vprops}
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