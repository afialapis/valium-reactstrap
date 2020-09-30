import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {CustomInput, Input, InputGroupAddon, InputGroupText}     from 'reactstrap'
import {vPropTypes, vDefaultProps} from './base/inputProps'
import parseNumeric from './helpers/parseNumeric'
import {withAddon} from './addon/withAddon'
import {useInnerValue, withValium} from './base'

let instanceCount= 1

const makeOptionsMap = (options, disallowedValues) => {
  const sdisallowedValues= disallowedValues!=undefined ? disallowedValues.map((v) => v.toString()) : []
  let options_map= []
  for (const key in options) {
    options_map.push({
      value: key,
      label: options[key],
      disabled: sdisallowedValues.indexOf(key)>=0
    })
  }
  return options_map  
}


const _VInputSelectRS = (props) => {

  const { id, name,  inputRef, 
          placeholder, readOnly, autocomplete, required, 
          disallowedValues, onChange, options, numeric, 
          inputStyle, clearable, valid, setValidity} = props

  const [innerValue, valueProps]= useInnerValue(props)

  const handleChange = useCallback((event) => {
    const value= event.target.value
    console.log(`select selected (${value})`)
    console.log(event.target)
    if (onChange!=undefined) {
      onChange(value)
    }
  }, [onChange])

  const [optionsMap, setOptionsMap]= useState(makeOptionsMap(options, disallowedValues))

  useEffect(() => {
    const nOptionsMap= makeOptionsMap(options, disallowedValues)
    setOptionsMap(nOptionsMap)
  }, [options, disallowedValues])

  const clear = (inputRef) => {
    inputRef.current.value= ''
    setValidity()
    if (onChange!=undefined) {
      onChange(parseNumeric(numeric, ''))
    }
  }    

  // console.log(`innerValue (${innerValue})`)
  
  return (
    <>
      <Input    
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
                onChange    = {handleChange}
                {...valueProps}
                >
        {optionsMap.map((opt) => 
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
      </Input>
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

const VInputSelectRS= withValium(withAddon(_VInputSelectRS), 'select')


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