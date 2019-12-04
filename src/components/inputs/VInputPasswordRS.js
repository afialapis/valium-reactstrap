import React       from 'react'
import VInputTextRS from './VInputTextRS'

const VInputPasswordRS = ({id, name, value, defaultValue, label, feedback, inline, placeholder, readOnly,
  required, maxLength, minLength, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup}) =>

  <VInputTextRS id                     = {id}
                name                   = {name}
                value                  = {value}
                defaultValue           = {defaultValue}
                label                  = {label || 'Password'}
                feedback               = {feedback}
                icon                   = {'lock'}
                inline                 = {inline}
                inputType              = {"password"}
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

VInputPasswordRS.propTypes = VInputTextRS.propTypes

delete VInputPasswordRS.propTypes['icon']
delete VInputPasswordRS.propTypes['inputType']


export default VInputPasswordRS