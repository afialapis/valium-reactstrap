import React       from 'react'
import VInputTextRS from './VInputTextRS'

const VInputEmailRS = ({id, name, value, defaultValue, label, feedback, inline, placeholder, readOnly,
  required, maxLength, minLength, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup}) =>

  <VInputTextRS id                     = {id}
                name                   = {name}
                value                  = {value}
                defaultValue           = {defaultValue}
                label                  = {label || 'E-Mail'}
                feedback               = {feedback}
                icon                   = {'envelope'}
                inline                 = {inline}
                inputType              = {"email"}
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

VInputEmailRS.propTypes = VInputTextRS.propTypes

delete VInputEmailRS.propTypes['icon']
delete VInputEmailRS.propTypes['inputType']


export default VInputEmailRS