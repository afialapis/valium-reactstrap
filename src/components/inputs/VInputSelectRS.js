import React, {useRef}       from 'react'
import PropTypes   from 'prop-types'
import VInputAddon from './VInputAddon'
import {VInput}    from 'valium'
import {CustomInput, InputGroupAddon, InputGroupText}     from 'reactstrap'
import {vPropTypes, vDefaultProps} from './common/VInputProps'
import valueOrDef   from './common/valueOrDef'
import parseNumeric from './common/numeric'

let instanceCount= 1

const VInputSelectRS = ({formActions, id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
                      required, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, onChange, options, keepHeight, formGroupStyle, inputGroupStyle, clearable, numeric}) => {

  const setValidity= useRef(undefined)
  const [vprops, nvalue]= valueOrDef(value, defaultValue, numeric)
  
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
      onChange(parseNumeric(''))
    }
  }

  const handleChange = (event) => {
    if (onChange!=undefined) { 
      return onChange(parseNumeric(numeric,event.target.value))
    }
  }

  return (
    <VInput type            = {"select"} 
            feedback        = {feedback} 
            checkValue      = {checkValue}
            allowedValues   = {allowedValues}
            disallowedValues= {disallowedValues}
            doRepeat             = {doRepeat}
            doNotRepeat          = {doNotRepeat}
            formActions     = {formActions}
            bindSetValidity = {(f) => {setValidity.current= f}}
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

              <CustomInput    id          = {id}
                        name        = {name}
                        type        = "select"
                        className   = "custom-select"
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
                {clearable
                 ? <option style={{display: "none"}} value=""></option>
                 : null}
              </CustomInput>
              {clearable
               ?  <InputGroupAddon onClick  = {() => {readOnly ? null : clear(inputRef)}}
                                  style    = {{cursor:(nvalue && !readOnly) ? 'pointer' : 'not-allowed'}}
                                  addonType= "append">
                    <InputGroupText
                                style={{opacity: (nvalue && !readOnly) ? 1 : 0.5}}>
                      {"x"}
                    </InputGroupText>
                  </InputGroupAddon>  
                : null
              }            
            </VInputAddon>
            }
    />
  )
}


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