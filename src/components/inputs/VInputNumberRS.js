import React       from 'react'
import PropTypes   from 'prop-types'
import VInputAddon from './VInputAddon'
import {VInput}    from 'valium'
import {Input}     from 'reactstrap'
import {vPropTypes, vDefaultProps} from './common/VInputProps'
import useInnerValue   from './common/useInnerValue'

const VInputNumberRS = (
  {formActions, id, name, value, defaultValue, label, feedback, icon, inline, 
    placeholder, readOnly, autocomplete, required, max, min, pattern, step, 
    checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, stepRange, 
    onChange, onConfirm, prematureValidation, keepHeight, formGroupStyle, inputGroupStyle, inputStyle}) => {

  const [innerValue, innerProps]= useInnerValue(value, defaultValue, onChange, onConfirm)
  
  return (
    <VInput type               = {"number"}
            feedback           = {feedback} 
            checkValue         = {checkValue}
            allowedValues      = {allowedValues}
            disallowedValues   = {disallowedValues}
            doRepeat           = {doRepeat}
            doNotRepeat        = {doNotRepeat}
            stepRange          = {stepRange}
            prematureValidation= {prematureValidation}
            formActions        = {formActions}
            render             = {({valid, message}, inputRef) => 
              <VInputAddon name        = {name}
                          label       = {label}
                          feedback    = {feedback==='no-feedback' ? undefined : feedback||message}
                          value       = {innerValue}
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
                        valid       = {innerValue!=undefined && innerValue!='' && valid}
                        invalid     = {! valid}
                        autoComplete= {autocomplete}
                        style       = {inputStyle} 
                        {...innerProps}
                />
              </VInputAddon>

            }/>
  )
}


VInputNumberRS.propTypes = {
  ...vPropTypes,
  prematureValidation : PropTypes.bool,
  placeholder         : PropTypes.string,
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  step                : PropTypes.number,
  pattern             : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
}

VInputNumberRS.defaultProps = {
  ...vDefaultProps,
  icon: 'dollar'
}

export default VInputNumberRS