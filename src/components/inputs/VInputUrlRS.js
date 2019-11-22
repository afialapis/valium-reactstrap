import React        from 'react'
import VInputTextRS from './VInputTextRS'

/*
https://justmarkup.com/articles/2012-12-28-input-url/
*/

const VInputUrlRS = ({name, value, defaultValue, label, feedback, inline, placeholder, readOnly,
  required, maxLength, minLength, pattern, checkValue, allowedValues, disallowedValues, onChange, checkValidityOnKeyup}) =>

  <VInputTextRS  name                   = {name}
                value                  = {value}
                defaultValue           = {defaultValue}
                label                  = {label || 'URL'}
                feedback               = {feedback}
                icon                   = {'at'}
                inline                 = {inline}
                inputType              = {"text"}
                placeholder            = {placeholder}
                readOnly               = {readOnly}
                required               = {required}
                maxLength              = {maxLength}
                minLength              = {minLength}
                pattern                = {pattern || "^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9-]{0,61}[a-zA-Z0-9])?.)+[a-zA-Z]{2,6}$"}
                checkValue             = {checkValue}
                allowedValues          = {allowedValues}
                disallowedValues       = {disallowedValues}
                onChange               = {onChange}
                checkValidityOnKeyup   = {checkValidityOnKeyup}
  />

VInputUrlRS.propTypes = VInputTextRS.propTypes

delete VInputUrlRS.propTypes['icon']
delete VInputUrlRS.propTypes['inputType']


export default VInputUrlRS