import React, {useRef, useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {VInputAddon} from './addon/VInputAddon'
import {Input, InputGroupAddon, InputGroupText} from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {useInnerValue} from './value/useInnerValue'
import {withValium} from './valium/withValium'
import {getEnabledOptions} from './helpers/getEnabledOptions'

const _VInputSelectSearch = (props) => {
  const {id, name, options, label, description, feedback, icon, inline, 
         placeholder, readOnly, autocomplete, required,
         allowedValues, disallowedValues, keepHeight, formGroupStyle, inputGroupStyle,
         inputStyle, onChange, clearable, maxShownOptions,
         message, valid, inputRef, setValidity, showAddon, showValidity
         } = props
  
  const wrapperRef    = useRef(undefined)
  const filterRef     = useRef(undefined)
  const listRef       = useRef(undefined)

  const [isOpen, setIsOpen]= useState(false)
  const [shownText, setShownText]= useState('')
  
  const [innerValue, setInnerValue, _controlled]= useInnerValue(props) 
  

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
    let nShownText= ''
    if (innerValue!=undefined) {
      try {
        const elOpt= options.find((opt) => opt[0]==innerValue)
        nShownText= elOpt[1] || ''
      } catch(_) {}
    }
    setShownText(nShownText)
  }, [options, innerValue])


  const handleChange = useCallback((value, event) => {
    setInnerValue(value)
    inputRef.current.value= value
    
        
    if (onChange!=undefined) { 
      onChange(value, event)
    }
    
    setValidity()
  }, [inputRef, setInnerValue, onChange, setValidity])

  const handleSearchStart = useCallback((_event) => {
    if (! isOpen) {
      setIsOpen(true)
    }
  }, [isOpen])

  const handleSearchType = useCallback((event) => {
    setShownText(event.target.value)
    handleSearchStart(event)
  }, [handleSearchStart])

  const handleSearchAbort = useCallback((event) => {
    setIsOpen(false)
    if (shownText=='') {
      handleChange('', event)
    }
  }, [shownText, handleChange])

  const handleSelect = useCallback((newValue, event) => {
    setIsOpen(false)
    handleChange(newValue, event)
  }, [handleChange])

  const getOptionsMap = useCallback(() => {
    const enabledOptions= getEnabledOptions(options, allowedValues, disallowedValues)
    const sfilter= shownText ? shownText.toLowerCase() : ''
    const optionsMap= enabledOptions
          .filter((opt) => sfilter.length>0 ? opt.label.toLowerCase().includes(sfilter) : true)
    return optionsMap
  }, [options, allowedValues, disallowedValues, shownText])


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
                      showAddon   = {showAddon}
                      showValidity= {showValidity}                       
                  formGroupStyle  = {formGroupStyle}
                  inputGroupStyle = {inputGroupStyle}>
            <Input    id          = {id}
                      name        = {name}
                      className   = "valium-reactstrap-select-search-hidden"
                      type        = "hidden"
                      innerRef    = {inputRef}
                      required    = {required}
                      defaultValue= {innerValue}
                      /*onChange    = {(ev) => handleChange(ev.target.value)}*/
                      />
            <Input    name        = {`input_select_search_${name}_text`}
                      className   = "valium-reactstrap-select-search-text custom-select"
                      type        = "text"
                      innerRef    = {filterRef}
                      value       = {shownText}
                      placeholder = {placeholder}
                      readOnly    = {readOnly}
                      required    = {required}
                      onClick     = {(ev) => handleSearchStart(ev)}
                      onChange    = {(ev) => handleSearchType(ev)}
                      autoComplete= {autocomplete}
                      style       = {inputStyle} 
                      {... showValidity>=2
                       ? {valid: valid, invalid: ! valid}
                       : {}}
                      />

            {clearable
            ?  <InputGroupAddon onClick  = {(ev) => {readOnly ? null : handleSelect('', ev)}}
                                style    = {{cursor:(innerValue && !readOnly) ? 'pointer' : 'not-allowed'}}
                                addonType= "append">
                  <InputGroupText
                              style={{opacity: (innerValue && !readOnly) ? 1 : 0.5}}>
                    {"x"}
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
              {getOptionsMap().map((opt, idx) =>  {
                if (idx<=(maxShownOptions-1)) {
                  return (
                    <div key     = {`${name}_option_${opt.value}`}
                          value   = {opt.value}
                          className={`valium-reactstrap-select-search-list-item list-group-item list-group-item-action ${opt.disabled ? 'disabled' : ''}`}
                          onClick = {(ev) => !opt.disabled && handleSelect(opt.value, ev)}
                          >
                      {opt.label || <>&nbsp;</>}
                    </div>)
                }
              }
              )}
              {getOptionsMap().length>maxShownOptions
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

const VInputSelectSearch = withValium(_VInputSelectSearch)


VInputSelectSearch.propTypes = {
  ...inputPropTypes,

  placeholder  : PropTypes.string,
  options      : PropTypes.arrayOf(PropTypes.array),
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