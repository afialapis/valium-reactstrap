import React        from 'react'
import PropTypes    from 'prop-types'
import VInputAddon  from './VInputAddon'
import {VInput}     from 'valium'
import {Input}      from 'reactstrap'
import VInputTypes  from './common/VInputTypes'
import valueOrDef   from './common/valueOrDef'


const VInputTimeRS = ({id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
                      required, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup, keepHeight, formGroupStyle, inputGroupStyle}) => {

  const [vprops, nvalue]= valueOrDef(value, defaultValue)
  
  return (
    <VInput type            = {"text"} 
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
                          icon        = {icon}
                          isValid     = {valid}
                          inline      = {inline}
                          keepHeight  = {keepHeight}
                          formGroupStyle = {formGroupStyle}
                          inputGroupStyle= {inputGroupStyle}>
                <Input  id          = {id}
                        name        = {name}
                        innerRef    = {inputRef}
                        type        = {"time"}
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


VInputTimeRS.propTypes = {
  ...VInputTypes,
  placeholder  : PropTypes.string,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputTimeRS.defaultProps = {
  icon: 'time'
}


export default VInputTimeRS