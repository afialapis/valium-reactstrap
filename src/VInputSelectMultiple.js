import React        from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {useInnerValue} from './value/useInnerValue'
import {withValium} from './valium/withValium'
import {useEnabledOptions} from './helpers/useEnabledOptions'

const numOrArrayToString = (v) => {
  if (Array.isArray(v)) {
    return v.map((a) => isNaN(a) ? '' : a.toString())
  }
  return isNaN(v) ? '' : v.toString()
}
      

const _VInputSelectMultiple = (props) => {
  const {id, name, inputRef, valid, setValidity,
         placeholder, readOnly, autocomplete, required,
         allowedValues, disallowedValues, onChange, options, 
         inputStyle} = props

  const [innerValue, setInnerValue, _controlled] = useInnerValue(props)

  const [enabledOptions]= useEnabledOptions(options, allowedValues, disallowedValues)

  const handleChange= (ev) => {
    const value= Array.prototype.slice.call(ev.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value)

    setInnerValue(numOrArrayToString(value))
    if (onChange!=undefined) { 
      onChange(value)
    }
    setValidity()
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
              value       = {innerValue}
              onChange    = {(event) => handleChange(event)}
              >
      {enabledOptions.map((opt) => 
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

const VInputSelectMultiple= withValium(withAddon(_VInputSelectMultiple))

VInputSelectMultiple.propTypes = {
  ...inputPropTypes,

  placeholder : PropTypes.string,
  options     : PropTypes.arrayOf(PropTypes.array),
  autocomplete: PropTypes.oneOf(["on", "off"])
}

VInputSelectMultiple.defaultProps = {
  ...inputDefaultProps,
  icon: 'list'
}


export default VInputSelectMultiple