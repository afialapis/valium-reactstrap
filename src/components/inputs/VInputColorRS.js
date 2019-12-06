import React        from 'react'
import PropTypes    from 'prop-types'
import VInputAddon  from './VInputAddon'
import {VInput}     from 'valium'
import {Input}      from 'reactstrap'
import VInputTypes  from './common/VInputTypes'
import valueOrDef   from './common/valueOrDef'

const VInputColorRS = ({formUpdate, id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
                      required, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyUp, keepHeight, formGroupStyle, inputGroupStyle}) => {

  const [vprops, nvalue]= valueOrDef(value, defaultValue)
  
  return (
    <VInput type                 = {"color"} 
            feedback             = {feedback} 
            checkValue           = {checkValue}
            allowedValues        = {allowedValues}
            disallowedValues     = {disallowedValues}
            checkValidityOnKeyUp = {checkValidityOnKeyUp}
            formUpdate           = {formUpdate}
            render  = {({valid, message}, inputRef) => 
              <VInputAddon name          = {name}
                          label          = {label}
                          feedback       = {feedback || message}
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
  ...VInputTypes,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputColorRS.defaultProps = {
  icon: 'color',
  checkValidityOnKeyUp: true
}



export default VInputColorRS