import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {useInput} from 'valium'
import {InputGroupAddon, InputGroupText}     from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {VInputAddon} from './addon/VInputAddon'
import {useInnerValue} from './value/useInnerValue'
import {getEnabledOptions} from './helpers/getEnabledOptions'
import {parseValueDependOnOptions} from './helpers/parseValueDependOnOptions'
import { useValidClassnames } from './helpers/useValidClassnames'

const getShowValidPropsForSelect = (showValidity, valid) => {
  if (showValidity!=1 && showValidity!=4) {
    return {}
  }
  return {
    'aria-invalid': (! valid).toString()
  }
}


const VInputSelect = (props) => {

  const { id, name,  label, description, feedback, icon, keepHeight,
          placeholder, readOnly, autocomplete, required, 
          allowedValues, disallowedValues, onChange, options, 
          inputStyle, clearable, showValidity, 
        inline, inputGroupStyle, formGroupStyle} = props

  const [innerValue, setInnerValue] = useInnerValue(props)
  const enabledOptions= getEnabledOptions(options, allowedValues, disallowedValues)

  const [inputRef, valid, message, setValidity]= useInput({
    ...props,
    checkValue: props.checkValue!=undefined 
                ? (v) => props.checkValue(parseValueDependOnOptions(v, enabledOptions))
                : undefined    
  })
  const [className]= useValidClassnames(valid, showValidity)

  
  const updValue = useCallback((nValue, event) => {
    const iValue= parseValueDependOnOptions(nValue, enabledOptions)
   
    setInnerValue(iValue)

    if (onChange!=undefined) {
      onChange(iValue, event)
    }
    inputRef.current.value= iValue
    setValidity()

  }, [inputRef, enabledOptions, setInnerValue, onChange, setValidity])

  const handleChange = useCallback((event) => {
    updValue(event.target.value, event)
  }, [updValue])


  const handleClear = useCallback((event) => {
    updValue('', event)

  }, [updValue])


  const is_clearable= (innerValue!='' && innerValue!=undefined && !readOnly) 
  
  return (
    <VInputAddon name           = {name}
                 label          = {label}
                 description    = {description}
                 feedback       = {feedback||message}
                 value          = {innerValue}
                 icon           = {icon}
                 showValidity   = {showValidity}                 
                 isValid        = {valid}
                 inline         = {inline}
                 keepHeight     = {keepHeight}
                 inputGroupStyle= {inputGroupStyle}
                 formGroupStyle = {formGroupStyle}
                 >
      <select    
                id          = {id}
                name        = {name}
                type        = "select"
                className   = {`custom-select ${className}`}
                ref         = {inputRef}
                placeholder = {placeholder || ""}
                readOnly    = {readOnly!=undefined ? readOnly  : false}
                required    = {required}
                autoComplete= {autocomplete}
                style       = {inputStyle} 
                value       = {innerValue || ''}
                onChange    = {(ev) => handleChange(ev)}
                
                /*valid={valid}
                invalid={!valid}*/
                {...getShowValidPropsForSelect(showValidity, valid)}
                >
        {clearable && enabledOptions.filter((opt) => opt.value=='').length==0
         ?  <option key       = {`${name}_option_empty`}
                    value     = {''}>
            {''}
          </option>
         : null}
        {enabledOptions.map((opt) => 
          <option key       = {`${name}_option_${opt.value}`}
                  value     = {opt.value}
                  {...opt.disabled ? {disabled: true} : {}}
                  >
            {opt.label}
          </option>
        )}
        {clearable
          ? <option style={{display: "none"}} value=""></option>
          : null}
      </select>
      {clearable
        ?  <InputGroupAddon onClick  = {(ev) => {is_clearable ? handleClear(ev) : null}}
                          style    = {{cursor:is_clearable ? 'pointer' : 'not-allowed'}}
                          addonType= "append">
            <InputGroupText
                        style={{opacity: is_clearable ? 1 : 0.5}}>
              {"x"}
            </InputGroupText>
          </InputGroupAddon>  
        : null
      }
    </VInputAddon>
  )
}


VInputSelect.propTypes = {
  ...inputPropTypes,

  placeholder : PropTypes.string,
  options     : PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.array)]),
  autocomplete: PropTypes.oneOf(["on", "off"]),
  clearable   : PropTypes.bool
}

VInputSelect.defaultProps = {
  ...inputDefaultProps,
  icon: 'list'
}

export default VInputSelect