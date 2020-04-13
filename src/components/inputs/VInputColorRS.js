import React        from 'react'
import PropTypes    from 'prop-types'
import VInputAddon  from './VInputAddon'
import {VInput}     from 'valium'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './common/VInputProps'
import valueOrDef   from './common/valueOrDef'

const VInputColorRS = ({formActions, id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
                      required, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, onChange, prematureValidation, keepHeight, formGroupStyle, inputGroupStyle}) => {

  const [vprops, nvalue]= valueOrDef(value, defaultValue)
  
  return (
    <VInput type                 = {"color"} 
            feedback             = {feedback} 
            checkValue           = {checkValue}
            allowedValues        = {allowedValues}
            disallowedValues     = {disallowedValues}
            doRepeat             = {doRepeat}
            doNotRepeat          = {doNotRepeat}
            prematureValidation  = {prematureValidation}
            formActions          = {formActions}
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
                        type        = {"color"}
                        placeholder = {placeholder || ""}
                        onChange    = {(event) => {if (onChange!=undefined) { return onChange(event.target.value)}}}
                        readOnly    = {readOnly!=undefined ? readOnly  : false}
                        required    = {required}
                        valid       = {nvalue!=undefined && nvalue!='' && valid}
                        invalid     = {! valid}
                        autoComplete= {autocomplete}
                        {...vprops}
                />
              </VInputAddon>
              }/>
  )
}


VInputColorRS.propTypes = {
  ...vPropTypes,
  prematureValidation : PropTypes.bool,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputColorRS.defaultProps = {
  ...vDefaultProps,
  icon: 'color'
}



export default VInputColorRS