import React, { useState, useEffect }         from 'react'
import PropTypes     from 'prop-types'
import {VInput}      from 'valium'
import {CustomInput} from 'reactstrap'
import VInputAddon   from './VInputAddon'
import VInputTypes   from './common/VInputTypes'
import valueOrDef   from './common/valueOrDef'

let instanceCount= 1

const VInputCheckboxRS = ({formActions, id, name, value, defaultValue, label, description, feedback, icon, inline, readOnly, 
                      required, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, onChange, keepHeight, formGroupStyle, inputGroupStyle}) => {

  const [vprops, nvalue]= valueOrDef(value, defaultValue)

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

  console.log('-----------------')
  console.log(nvalue)

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
                          feedback    = {feedback || message}
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
                        {...vprops}
                />
                */}
                
                <div className    = "custom-switch custom-control"
                      onClick     = {(event) => handleClick(event, inputRef)}> 
                  <input type     = "checkbox" 
                         id       = {id} 
                         name     = {name} 
                         className= {`custom-control-input ${innerValue && valid ? 'is-valid' : ''} ${! valid ? 'is-invalid' : ''}`}
                         ref      = {inputRef}
                         readOnly = {readOnly!=undefined ? readOnly  : false}
                         required = {required}
                         {...vprops}                         
                         ></input>
                  <label className="custom-control-label"
                         htmlFor={id}>{description}</label>
                </div>
              </VInputAddon>

              }/>
  )
}




VInputCheckboxRS.propTypes = {
  ...VInputTypes,
  description         : PropTypes.string,
}

VInputCheckboxRS.defaultProps = {
  id: `valium-reactstrap-input-checkbox-${instanceCount++}`,
  icon: undefined
}


export default VInputCheckboxRS