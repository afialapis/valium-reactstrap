import React       from 'react'
import PropTypes   from 'prop-types'
import VInputAddon from './VInputAddon'
import {VInput}    from 'valium'
import {Input}     from 'reactstrap'
import VInputTypes from './common/VInputTypes'
import valueOrDef   from './common/valueOrDef'

const VInputNumberRS = ({id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
                      required, max, min, pattern, step, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup, keepHeight, formGroupStyle, inputGroupStyle}) => {

  const [vprops, nvalue]= valueOrDef(value, defaultValue)
  
  return (
    <VInput type            = {"number"}
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
                        autoComplete= {autocomplete}
                        {...vprops}
                />
              </VInputAddon>

            }/>
  )
}


VInputNumberRS.propTypes = {
  ...VInputTypes,
  placeholder         : PropTypes.string,
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  step                : PropTypes.number,
  pattern             : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
}

VInputNumberRS.defaultProps = {
  icon: 'dollar-sign'
}

export default VInputNumberRS