import React       from 'react'
import VInputTextRS from './VInputTextRS'

const VInputTextAreaRS = ({id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly,
  required, maxLength, minLength, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup}) =>

  <VInputTextRS id                     = {id}
                name                   = {name}
                value                  = {value}
                defaultValue           = {defaultValue}
                label                  = {label}
                feedback               = {feedback}
                icon                   = {icon}
                inline                 = {inline}
                inputType              = {"textarea"}
                placeholder            = {placeholder}
                readOnly               = {readOnly}
                required               = {required}
                maxLength              = {maxLength}
                minLength              = {minLength}
                checkValue             = {checkValue}
                allowedValues          = {allowedValues}
                disallowedValues       = {disallowedValues}
                onChange               = {onChange}
                checkValidityOnKeyup   = {checkValidityOnKeyup}
  />

VInputTextAreaRS.propTypes = VInputTextRS.propTypes

delete VInputTextAreaRS.propTypes['inputType']


export default VInputTextAreaRS