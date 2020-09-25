import React, {useCallback} from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './base/inputProps'
import parseNumeric from './helpers/parseNumeric'
import {useInnerValue, withValium, withAddon} from './base'

const numOrArrayToString = (v) => {
  if (Array.isArray(v)) {
    return v.map((a) => isNaN(a) ? '' : a.toString())
  }
  return isNaN(v) ? '' : v.toString()
}

const valueTransform = {
  from: (v) => numOrArrayToString(v),
  to: (v) => v
}

const _VInputSelectMultipleRS = (props) => {
  const {id, name, inputRef, valid, setValidity,
         placeholder, readOnly, autocomplete, required,
         disallowedValues, onChange, options, 
         inputStyle, numeric} = props

  

  const [innerValue, valueProps]= useInnerValue(props)
  

  const sdisallowedValues= disallowedValues!=undefined ? disallowedValues.map((v) => v.toString()) : []
  let options_map= []
  
  for (const key in options) {
    options_map.push({
      value: key,
      label: options[key],
      disabled: sdisallowedValues.indexOf(key)>=0
    })
  }

  const handleChange= (ev) => {
    setValidity()
    if (onChange!=undefined) { 
      const value= Array.prototype.slice.call(ev.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value)
      onChange(value.map((v) => parseNumeric(numeric, v)))
    }
  }

  return (
    <Input    id          = {id}
              name        = {name}
              type        = "select"
              className   = "custom-select"
              multiple
              innerRef    = {inputRef}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              required    = {required}
              valid       = {innerValue!=undefined && innerValue!='' && valid}
              invalid     = {! valid}
              autoComplete= {autocomplete}
              style       = {inputStyle} 
              {...valueProps}
              onChange    = {(event) => handleChange(event)}
              >
      {options_map.map((opt) => 
        <option key={`${name}_option_${opt.value}`}
                value={opt.value}
                disabled={opt.disabled}
                >
          {opt.label}
        </option>
      )}
    </Input>
  )
}

const VInputSelectMultipleRS= withValium(withAddon(_VInputSelectMultipleRS), 'select-multiple')

VInputSelectMultipleRS.propTypes = {
  ...vPropTypes,

  placeholder : PropTypes.string,
  options     : PropTypes.object,
  autocomplete: PropTypes.oneOf(["on", "off"]),
  numeric     : PropTypes.bool
}

VInputSelectMultipleRS.defaultProps = {
  ...vDefaultProps,
  icon: 'list'
}


export default VInputSelectMultipleRS