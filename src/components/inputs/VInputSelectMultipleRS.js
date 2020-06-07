import React        from 'react'
import PropTypes    from 'prop-types'
import VInputAddon  from './VInputAddon'
import {VInput}     from 'valium'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './common/VInputProps'
import valueOrDef   from './common/valueOrDef'
import parseNumeric from './common/numeric'

const numOrArrayToString = (v) => {
  if (Array.isArray(v)) {
    return v.map((a) => isNaN(a) ? '' : a.toString())
  }
  return isNaN(v) ? '' : v.toString()
}



const VInputSelectMultipleRS = (
  {formActions, id, name, value, defaultValue, label, feedback, icon, inline, 
    placeholder, readOnly, autocomplete, required, checkValue, allowedValues, 
    disallowedValues, doRepeat, doNotRepeat, onChange, options, keepHeight, 
    formGroupStyle, inputGroupStyle, inputStyle, numeric}) => {

  
  
  const [vprops, nvalue]= valueOrDef(value, defaultValue, numOrArrayToString)
  
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
    if (onChange!=undefined) { 
      const value= Array.prototype.slice.call(ev.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value)
      onChange(value.map((v) => parseNumeric(numeric, v)))
    }
  }


  return (
    <VInput type = {"select-multiple"} 
            feedback        = {feedback} 
            checkValue      = {checkValue}
            allowedValues   = {allowedValues}
            disallowedValues= {disallowedValues}
            doRepeat             = {doRepeat}
            doNotRepeat          = {doNotRepeat}
            formActions     = {formActions}
            render          = {({valid, message}, inputRef) => 
            <VInputAddon name        = {name}
                        label       = {label}
                        feedback    = {feedback==='no-feedback' ? undefined : feedback||message}
                        value       = {nvalue}
                        icon        = {icon}
                        isValid     = {valid}
                        inline      = {inline}
                        keepHeight  = {keepHeight}
                        formGroupStyle = {formGroupStyle}
                        inputGroupStyle= {inputGroupStyle}>
              <Input    id          = {id}
                        name        = {name}
                        type        = "select"
                        className   = "custom-select"
                        multiple
                        innerRef    = {inputRef}
                        placeholder = {placeholder || ""}
                        onChange    = {(event) => handleChange(event)}
                        readOnly    = {readOnly!=undefined ? readOnly  : false}
                        required    = {required}
                        valid       = {nvalue!=undefined && nvalue!='' && valid}
                        invalid     = {! valid}
                        autoComplete= {autocomplete}
                        style       = {inputStyle} 
                        {...vprops}>
                {options_map.map((opt) => 
                  <option key={`${name}_option_${opt.value}`}
                          value={opt.value}
                          disabled={opt.disabled}
                          >
                    {opt.label}
                  </option>
                )}
              </Input>
            </VInputAddon>
            }/>
  )
}


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