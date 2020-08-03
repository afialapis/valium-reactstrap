import React from 'react'
import PropTypes from 'prop-types'
import {CustomInput, InputGroupAddon, InputGroupText}     from 'reactstrap'
import {vPropTypes, vDefaultProps} from './base/inputProps'
import parseNumeric from './common/numeric'
import {withValue, withValium, withAddon} from './base'

let instanceCount= 1

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

const _VInputSelectRS = (props) => {

  const { id, name,  inputRef, innerValue, innerProps,
          placeholder, readOnly, autocomplete, required, 
          disallowedValues, onChange, options, numeric, 
          inputStyle, clearable, valid, setValidity} = props

  const sdisallowedValues= disallowedValues!=undefined ? disallowedValues.map((v) => v.toString()) : []
  let options_map= []
  for (const key in options) {
    options_map.push({
      value: key,
      label: options[key],
      disabled: sdisallowedValues.indexOf(key)>=0
    })
  }

  const clear = (inputRef) => {
    inputRef.current.value= ''
    setValidity.current()
    if (onChange!=undefined) {
      onChange(parseNumeric(numeric, ''))
    }
  }    

  const handleChange = (event) => {
    if (onChange!=undefined) { 
      return onChange(parseNumeric(numeric, event.target.value))
    }
  }  
  
  return (
    <>
      <CustomInput    
                id          = {id}
                name        = {name}
                type        = "select"
                className   = "custom-select"
                innerRef    = {inputRef}
                placeholder = {placeholder || ""}
                readOnly    = {readOnly!=undefined ? readOnly  : false}
                required    = {required}
                valid       = {innerValue!=undefined && innerValue!='' && valid}
                invalid     = {! valid}
                autoComplete= {autocomplete}
                style       = {inputStyle} 
                {...innerProps}
                onChange    = {(event) => handleChange(event)}
                >
        {options_map.map((opt) => 
          <option key       = {`${name}_option_${opt.value}`}
                  value     = {opt.value}
                  disabled  = {opt.disabled}
                  >
            {opt.label}
          </option>
        )}
        {clearable
          ? <option style={{display: "none"}} value=""></option>
          : null}
      </CustomInput>
      {clearable
        ?  <InputGroupAddon onClick  = {() => {readOnly ? null : clear(inputRef)}}
                          style    = {{cursor:(innerValue && !readOnly) ? 'pointer' : 'not-allowed'}}
                          addonType= "append">
            <InputGroupText
                        style={{opacity: (innerValue && !readOnly) ? 1 : 0.5}}>
              {"x"}
            </InputGroupText>
          </InputGroupAddon>  
        : null
      }
    </>
  )
}

const VInputSelectRS= withValue(withValium(withAddon(_VInputSelectRS), 'select'), valueTransform)


VInputSelectRS.propTypes = {
  ...vPropTypes,

  placeholder : PropTypes.string,
  options     : PropTypes.object,
  autocomplete: PropTypes.oneOf(["on", "off"]),
  clearable   : PropTypes.bool,
  numeric     : PropTypes.bool
}

VInputSelectRS.defaultProps = {
  ...vDefaultProps,
  icon: 'list',
  id: `valium-reactstrap-input-checkbox-${instanceCount++}`,
}

export default VInputSelectRS