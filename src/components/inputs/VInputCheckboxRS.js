import React, { useState, useEffect }         from 'react'
import PropTypes     from 'prop-types'
import {VInput}      from 'valium'
// import {CustomInput} from 'reactstrap'
import VInputAddon   from './VInputAddon'
import {vPropTypes, vDefaultProps}   from './common/inputProps'
import valueOrDef   from './common/valueOrDef'

let instanceCount= 1

const VInputCheckboxRS = ({formActions, id, name, value, defaultValue, label, description, feedback, icon, inline, readOnly, 
                      required, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, onChange, keepHeight, 
                      formGroupStyle, inputGroupStyle, inputStyle}) => {

  const [vprops, nvalue]= valueOrDef(value, defaultValue)
  const cprops= {
    checked: vprops.value,
    defaultChecked: vprops.defaultChecked
  }

  const [innerValue, setInnerValue]= useState(nvalue)
  
  useEffect(() => {
    setInnerValue(nvalue)
  }, [value, defaultValue])

  const handleClick = (ev, inputRef) => {
    const checked= !innerValue
    inputRef.current.checked= checked
    setInnerValue(checked)

    if (onChange!=undefined) {
      onChange(checked)
    }
  }
  
  return (
    <VInput type                 = {"checkbox"}
            feedback             = {feedback} 
            checkValue           = {checkValue}
            allowedValues        = {allowedValues}
            disallowedValues     = {disallowedValues}
            doRepeat             = {doRepeat}
            doNotRepeat          = {doNotRepeat}
            formActions          = {formActions}
            render  = {({valid, message}, inputRef) => 
              <VInputAddon name       = {name}
                          label       = {label}
                          feedback    = {feedback==='no-feedback' ? undefined : feedback||message}
                          value       = {innerValue}
                          icon        = {icon}
                          isValid     = {valid}
                          inline      = {inline}
                          keepHeight  = {keepHeight}
                          formGroupStyle = {formGroupStyle}
                          inputGroupStyle= {inputGroupStyle}>
                
                {/*
                <CustomInput  
                        id          = {id}
                        name        = {name}
                        innerRef    = {inputRef}
                        type        = {"switch"}
                        label       = {description}
                        onChange    = {onChange!=undefined ? (event) => onChange(event.target.checked) : undefined}
                        readOnly    = {readOnly!=undefined ? readOnly  : false}
                        required    = {required}
                        valid       = {innerValue!=undefined && innerValue!='' && valid}
                        invalid     = {! valid}
                        style       = {inputStyle} 
                        {...vprops}
                />
                */}
                
                <div className    = "custom-switch custom-control"
                      onClick     = {(event) => handleClick(event, inputRef)}
                      /* better styling on the div, it is not very useful on the input here */
                      style    = {inputStyle} > 
                  <input type     = "checkbox" 
                         id       = {id} 
                         name     = {name} 
                         className= {`custom-control-input ${innerValue && valid ? 'is-valid' : ''} ${! valid ? 'is-invalid' : ''}`}
                         ref      = {inputRef}
                         readOnly = {readOnly!=undefined ? readOnly  : false}
                         required = {required}
                         onChange    = {(event) => {if (onChange!=undefined) { return onChange(event.target.value)}}}
                         {...cprops}
                  />
                  <label className="custom-control-label"
                         htmlFor={id}>{description}</label>
                </div>
              </VInputAddon>

              }/>
  )
}




VInputCheckboxRS.propTypes = {
  ...vPropTypes,
  description         : PropTypes.string,
}

VInputCheckboxRS.defaultProps = {
  ...vDefaultProps,
  id: `valium-reactstrap-input-checkbox-${instanceCount++}`,
  icon: undefined
}


export default VInputCheckboxRS