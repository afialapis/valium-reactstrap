import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {InputGroupAddon, InputGroupText}     from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {withValium} from './valium/withValium'
import {useInnerValue} from './value/useInnerValue'
import {getEnabledOptions} from './helpers/getEnabledOptions'
import { useValidClassnames } from './helpers/useValidClassnames'

const getShowValidPropsForSelect = (showValidProps) => {
  if (Object.keys(showValidProps).length==0) {
    return {}
  }
  return {
    'aria-invalid': showValidProps.invalid.toString()
  }
}


const _VInputSelect = (props) => {

  const { id, name,  inputRef, 
          placeholder, readOnly, autocomplete, required, 
          allowedValues, disallowedValues, onChange, options, 
          inputStyle, clearable, valid, showValidity, showValidProps, setValidity} = props
  
  const [innerValue, setInnerValue, _controlled] = useInnerValue(props)

  const [className]= useValidClassnames(valid, showValidity)

  const updValue = useCallback((nValue, event) => {
    let iValue= nValue

    // check if is Numeric and convert
    if (! isNaN(iValue)) {
      const optVals= options.map((o) => o[0])
      if (optVals.indexOf(iValue)<0) {

        if (optVals.indexOf(parseFloat(iValue))>=0) {
          iValue= parseFloat(iValue)
        } else if (optVals.indexOf(parseInt(iValue))>=0) {
          iValue= parseInt(iValue)
        } 
      }
    }
    
    setInnerValue(iValue)

    if (onChange!=undefined) {
      onChange(iValue, event)
    }
    inputRef.current.value= iValue
    setValidity()

  }, [inputRef, setInnerValue, onChange, options, setValidity])

  const handleChange = useCallback((event) => {
    updValue(event.target.value, event)
  }, [updValue])


  const handleClear = useCallback((event) => {
    updValue('', event)

  }, [updValue])


  const enabledOptions= getEnabledOptions(options, allowedValues, disallowedValues)
  
  return (
    <>
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
                value       = {innerValue}
                onChange    = {(ev) => handleChange(ev)}
                
                /*valid={valid}
                invalid={!valid}*/
                {...getShowValidPropsForSelect(showValidProps)}
                >
        {enabledOptions.map((opt) => 
          <option key       = {`${name}_option_${opt.value}`}
                  value     = {opt.value}
                  disabled  = {opt.disabled}
                  /*selected  = {opt.value==innerValue}*/
                  >
            {opt.label}
          </option>
        )}
        {clearable
          ? <option style={{display: "none"}} value=""></option>
          : null}
      </select>
      {clearable
        ?  <InputGroupAddon onClick  = {(ev) => {readOnly ? null : handleClear(ev)}}
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

const VInputSelect= withValium(withAddon(_VInputSelect))

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