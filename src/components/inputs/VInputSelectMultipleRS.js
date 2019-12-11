import React        from 'react'
import PropTypes    from 'prop-types'
import VInputAddon  from './VInputAddon'
import {VInput}     from 'valium'
import {Input}      from 'reactstrap'
import VInputTypes  from './common/VInputTypes'
import valueOrDef   from './common/valueOrDef'



const VInputSelectMultipleRS = ({formActions, id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
                      required, checkValue, allowedValues, disallowedValues, onChange, options, keepHeight, formGroupStyle, inputGroupStyle}) => {

  const [vprops, nvalue]= valueOrDef(value, defaultValue)

  
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
      onChange(value)
    }
  }


  return (
    <VInput type = {"select-multiple"} 
            feedback        = {feedback} 
            checkValue      = {checkValue}
            allowedValues   = {allowedValues}
            disallowedValues= {disallowedValues}
            formActions     = {formActions}
            render          = {({valid, message}, inputRef) => 
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
  ...VInputTypes,

  placeholder : PropTypes.string,
  options     : PropTypes.object,
  autocomplete: PropTypes.oneOf(["on", "off"]),
}

VInputSelectMultipleRS.defaultProps = {
  icon: 'list'
}


export default VInputSelectMultipleRS