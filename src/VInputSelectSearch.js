import React, {useRef, useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {useInput} from 'valium'
import {VInputAddon} from './addon/VInputAddon'
import {Input, InputGroupAddon, InputGroupText} from 'reactstrap'
import VIcon from './icons'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {useInnerValue} from './value/useInnerValue'
import {useEnabledOptions} from './helpers/useEnabledOptions'
import {parseValueDependOnOptions} from './helpers/parseValueDependOnOptions'

const getOptionsLabel = (options, value) => {
  const elOpt= options.find((opt) => opt.value==value)
  return elOpt?.label || ''
}

const VInputSelectSearch = (props) => {
  const {id, name, options, label, description, feedback, icon, inline, 
         placeholder, readOnly, autocomplete, required,
         allowedValues, disallowedValues, keepHeight, formGroupStyle, inputGroupStyle,
         inputStyle, onChange, clearable, maxShownOptions,
         showValidity, bsSize
         } = props
  
  const wrapperRef    = useRef(undefined)
  const filterRef     = useRef(undefined)
  const listRef       = useRef(undefined)

  const [isOpen, setIsOpen]= useState(false)
  const [optionsMap, setOptionsMap]= useState([])
  const [optActive, setOptActive]= useState(undefined)
  
  
  const [innerValue, setInnerValue]= useInnerValue(props) 
  const [enabledOptions]= useEnabledOptions(options, allowedValues, disallowedValues)

  const [shownText, setShownText]= useState('')


  const [inputRef, valid, message, setValidity]= useInput({
    ...props,
    checkValue: props.checkValue!=undefined 
                ? (v) => props.checkValue(parseValueDependOnOptions(v, enabledOptions))
                : undefined    
  })

  useEffect(() => {
    const onClickOutside = (event) => {
      if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (listRef && listRef.current && !listRef.current.contains(event.target)) {
          handleSearchAbort(event)
        }
      }    
    }    

    document.addEventListener('mousedown', onClickOutside)

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  })

  
  useEffect(() => {
    setShownText(
      getOptionsLabel(enabledOptions, innerValue)
    )
  }, [innerValue, enabledOptions])

  useEffect(() => {
    const sfilter= shownText ? shownText.toLowerCase() : ''
    const nOptionsMap= enabledOptions
          .filter((opt) => sfilter.length>0 ? opt.label.toLowerCase().includes(sfilter) : true)
    setOptionsMap(nOptionsMap)
  }, [shownText, enabledOptions])




  const handleChange = useCallback((nValue, event) => {
    const value= parseValueDependOnOptions(nValue, enabledOptions)
    setInnerValue(value)
    inputRef.current.value= value
    
    const nShownText= getOptionsLabel(enabledOptions, value)
    setShownText(nShownText)
        
    if (onChange!=undefined) { 
      onChange(value, event)
    }
    
    setValidity()
  }, [inputRef, setInnerValue, onChange, setValidity, enabledOptions])

  const handleSearchStart = useCallback((_event) => {
    if (! isOpen) {
      setIsOpen(true)
    }
    setOptActive(undefined)
  }, [isOpen])

  const handleSearchType = useCallback((event) => {
    setShownText(event.target.value)
    handleSearchStart(event)
  }, [handleSearchStart])

  const handleSearchAbort = useCallback((event) => {
    setIsOpen(false)
    setOptActive(undefined)
    if (shownText=='') {
      handleChange('', event)
    }
  }, [shownText, handleChange])

  const handleSelect = useCallback((newValue, event) => {
    setIsOpen(false)
    setOptActive(undefined)
    handleChange(newValue, event)
  }, [handleChange])

  const handleClear = useCallback((event) => {
    setIsOpen(true)
    setOptActive(undefined)
    handleChange('', event)
  }, [handleChange])


  const handleKeyDown = useCallback((event) => {
    if (event.key=='ArrowUp' || event.key=='ArrowDown') {
      event.preventDefault()
      
      if (isOpen) {
        if (optionsMap.length>0) {
          const factor = event.key=='ArrowUp' ? -1 : 1
          const nOptActive= optActive==undefined
                ? 0
                : optActive + factor

          setOptActive(nOptActive)
        }
      }
    }
    if (event.key=='Enter') {
      event.preventDefault()
      if (isOpen) {
        if (optionsMap.length>0) {
          if (optActive!=undefined) {
            const opt= optionsMap[optActive]
            if (opt?.disabled!==true) {
              const nValue= opt.value
              handleSelect(nValue, event)
            }
          }
        }
      }
    }
  }, [isOpen, optActive, optionsMap, handleSelect])




  const getListStyle= () => {
    // TODO
    // Check where this gap (13 / 6) comes from and try to make better
    /*if (filterRef.current) {  
      return {
        left: filterRef.current.parentNode.children[0].offsetWidth+13+'px',
        minWidth: filterRef.current.offsetWidth+'px',
        maxWidth: filterRef.current.offsetWidth+'px'
      }
    }*/
    return {}
  }

  const is_clearable= (innerValue!='' && innerValue!=undefined && !readOnly) 

  return (

      <div className="valium-reactstrap-select-search"
            ref = {wrapperRef}>
        <div>
          <VInputAddon name        = {name}
                      label       = {label}
                      description = {description}
                      feedback    = {isOpen ? undefined : feedback||message}
                      value       = {innerValue}
                      icon        = {icon}
                      isValid     = {valid}
                      inline      = {inline}
                      keepHeight  = {isOpen ? false : keepHeight}
                      showValidity= {showValidity}                       
                  formGroupStyle  = {formGroupStyle}
                  inputGroupStyle = {inputGroupStyle}>
            <Input    id          = {id}
                      name        = {name}
                      className   = "valium-reactstrap-select-search-hidden"
                      type        = "hidden"
                      innerRef    = {inputRef}
                      required    = {required}
                      defaultValue= {innerValue || ''}
                      /*onChange    = {(ev) => handleChange(ev.target.value)}*/
                      />
            <Input    name        = {`input_select_search_${name}_text`}
                      className   = {`valium-reactstrap-select-search-text custom-select ${bsSize == 'sm' ? 'custom-select-sm' : ''}`}
                      type        = "text"
                      innerRef    = {filterRef}
                      value       = {shownText}
                      placeholder = {placeholder}
                      readOnly    = {readOnly}
                      required    = {required}
                      onClick     = {(ev) => handleSearchStart(ev)}
                      onChange    = {(ev) => handleSearchType(ev)}
                      onKeyDown   = {(ev) => handleKeyDown(ev)}
                      autoComplete= {autocomplete}
                      style       = {inputStyle} 
                      bsSize      = {bsSize}
                      {... (showValidity==1 || showValidity==4)
                       ? {valid: valid, invalid: ! valid}
                       : {}}
                      />

            {clearable
            ?  <InputGroupAddon onClick  = {(ev) => {is_clearable ? handleClear(ev) : null}}
                                style    = {{cursor:is_clearable ? 'pointer' : 'not-allowed'}}
                                addonType= "append">
                  <InputGroupText
                              style={{opacity: is_clearable ? 1 : 0.5}}>
                    <VIcon icon="cross"/>
                  </InputGroupText>
                </InputGroupAddon>  
              : null
            }                             
          </VInputAddon>
        </div>
        
          {isOpen
          ? <div className="valium-reactstrap-select-search-list list-group shadow-lg"
                  ref = {listRef}
                  style={getListStyle()}>
              {optionsMap.map((opt, idx) =>  {
                if (idx<=(maxShownOptions-1)) {
                  return (
                    <div key     = {`${name}_option_${opt.value}`}
                          value   = {opt.value}
                          className={`valium-reactstrap-select-search-list-item list-group-item list-group-item-action ${opt.disabled ? 'disabled' : ''} ${optActive==idx ? 'active': ''}`}
                          onClick = {(ev) => !opt.disabled && handleSelect(opt.value, ev)}
                          >
                      {opt.label || <>&nbsp;</>}
                    </div>)
                }
              }
              )}
              {optionsMap.length>maxShownOptions
                ? <div key     = {`${name}_option_ellipsis`}
                      className={`valium-reactstrap-select-search-list-item list-group-item list-group-item-action disabled ellipsis`}>
                  ...
                  </div>
                : null}
            </div>
          : null
          }
      
      </div>
  )
}


VInputSelectSearch.propTypes = {
  ...inputPropTypes,

  placeholder  : PropTypes.string,
  options     : PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.array)]),
  autocomplete : PropTypes.oneOf(["on", "off"]),
  clearable    : PropTypes.bool,
  maxShownOptions: PropTypes.number
}


VInputSelectSearch.defaultProps = {
  ...inputDefaultProps,
  icon: 'search',
  maxShownOptions: 10
}

export default VInputSelectSearch