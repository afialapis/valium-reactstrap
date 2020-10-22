import React from 'react'
import PropTypes from 'prop-types'
import {InputGroupAddon, InputGroupText}     from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {useValueProps} from './value/useValueProps'
import {withValium} from './valium/withValium'
import {useEnabledOptions} from './helpers/useEnabledOptions'

const _VInputSelect = (props) => {

  const { id, name,  inputRef, 
          placeholder, readOnly, autocomplete, required, 
          allowedValues, disallowedValues, onChange, options, 
          inputStyle, clearable, valid, setValidity} = props

  const [innerValue, valueProps]= useValueProps(props)
  const [enabledOptions]= useEnabledOptions(options, allowedValues, disallowedValues)

  const clear = (inputRef) => {
    inputRef.current.value= ''
    setValidity()
    if (onChange!=undefined) {
      onChange(undefined)
    }
  }    
  
  return (
    <>
      <select    
                id          = {id}
                name        = {name}
                type        = "select"
                className   = "custom-select"
                ref         = {inputRef}
                placeholder = {placeholder || ""}
                readOnly    = {readOnly!=undefined ? readOnly  : false}
                required    = {required}
                valid       = {valid.toString()}
                invalid     = {(! valid).toString()}
                autoComplete= {autocomplete}
                style       = {inputStyle} 
                {...valueProps}
                >
        {enabledOptions.map((opt) => 
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
      </select>
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

const VInputSelect= withValium(withAddon(_VInputSelect))

VInputSelect.propTypes = {
  ...inputPropTypes,

  placeholder : PropTypes.string,
  options     : PropTypes.arrayOf(PropTypes.array),
  autocomplete: PropTypes.oneOf(["on", "off"]),
  clearable   : PropTypes.bool
}

VInputSelect.defaultProps = {
  ...inputDefaultProps,
  icon: 'list'
}

export default VInputSelect