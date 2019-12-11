import React, {useRef, useState, useEffect}        from 'react'
import PropTypes     from 'prop-types'
import VInputAddon   from './VInputAddon'
import {VInput}      from 'valium'
import {Input, InputGroupAddon, InputGroupText}       from 'reactstrap'
import VInputTypes   from './common/VInputTypes'
import valueOrDef   from './common/valueOrDef'

const VInputSelectSearchRS = ({formActions, id, name, value, defaultValue, options, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
                               required, checkValue, allowedValues, disallowedValues, keepHeight, formGroupStyle, inputGroupStyle, onChange, clearable}) => {
  
  const setValidity   = useRef(undefined)
  const wrapperRef    = useRef(undefined)
  const innerSearchRef= useRef(undefined)

  const [isOpen, setIsOpen]= useState(false)
  const [filter, setFilter]= useState('')
  const [currentValue, setCurrentValue]= useState(defaultValue!=undefined ? defaultValue: value)


  // make options Map
  const optionsMap= []
  const sdisallowedValues= disallowedValues!=undefined ? disallowedValues.map((v) => v.toString()) : []
  const sfilter= filter.toLowerCase() || ''
  for (const key in options) {
    const label= options[key]
    const match= sfilter.length>0 ? label.toLowerCase().includes(sfilter) : true
    if (match) {
      optionsMap.push({
        value: key,
        label: label,
        disabled: sdisallowedValues.indexOf(key)>=0
      })
    }
  }

  const onSearchStart = () => {
    if (! isOpen) {
      setIsOpen(true)
      setFilter('')
    }
  }

  const onSearchType = (ev) => {
    setFilter(ev.target.value)
  }

  const onSearchAbort = () => {
    innerSearchRef.current.value= options[currentValue] || ''
    setIsOpen(false)
  }

  const onSelect = (newValue, hiddenRef) => {
    innerSearchRef.current.value= options[newValue] || ''
    hiddenRef.current.value= newValue
    setValidity.current()

    setIsOpen(false)
    setCurrentValue(newValue)
    
    if (onChange!=undefined) { 
      onChange(newValue)
    }
  }

  const onClickOutside = (event) => {
    if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onSearchAbort()
    }    
  }

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside)
    innerSearchRef.current.value= options[currentValue] || ''
    setValidity.current()

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [value, defaultValue])


  const [vprops, nvalue]= valueOrDef(value, defaultValue)

  return (

    <VInput type            = {"select"}
            feedback        = {feedback} 
            checkValue      = {checkValue}
            allowedValues   = {allowedValues}
            disallowedValues= {disallowedValues}
            bindSetValidity = {(f) => {setValidity.current= f}}
            formActions     = {formActions}
            render          = {({valid, message}, inputRef) => 
            <div className="valium-reactstrap-select-search"
                  ref = {wrapperRef}>
              <div>
                <VInputAddon name        = {name}
                            label       = {label}
                            feedback    = {isOpen ? undefined : (feedback || message)}
                            value       = {nvalue}
                            icon        = {icon}
                            isValid     = {valid}
                            inline      = {inline}
                            keepHeight  = {isOpen ? false : keepHeight}
                        formGroupStyle  = {formGroupStyle}
                        inputGroupStyle = {inputGroupStyle}>
                  <Input    id          = {id}
                            name        = {name}
                            className   = "valium-reactstrap-select-search-hidden"
                            type        = "hidden"
                            innerRef    = {inputRef}
                            required    = {required}
                            {...vprops}/>
                  <Input    name        = {`input_select_search_${name}_text`}
                            className   = "valium-reactstrap-select-search-text custom-select"
                            type        = "text"
                            innerRef    = {innerSearchRef}
                            placeholder = {placeholder}
                            readOnly    = {readOnly}
                            required    = {required}
                            valid       = {nvalue!=undefined && nvalue!='' && valid}
                            invalid     = {! valid}
                            onClick     = {(_ev) => onSearchStart()}
                            onKeyUp     = {(ev) => {onSearchStart(); onSearchType(ev)}}
                            autoComplete= {autocomplete}
                            />

                  {clearable
                  ?  <InputGroupAddon onClick  = {() => {readOnly ? null : onSelect('', inputRef)}}
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
              </div>
              <div>
                {isOpen
                ? <div className="valium-reactstrap-select-search-list list-group">
                    {optionsMap.map((opt) => 
                      <div key     = {`${name}_option_${opt.value}`}
                            value   = {opt.value}
                            disabled= {opt.disabled}
                            className="valium-reactstrap-select-search-list-item list-group-item list-group-item-action" 
                            onClick = {(_ev) => onSelect(opt.value, inputRef)}
                            >
                        {opt.label}
                      </div>
                    )}
                  </div>
                : null
                }
              </div>
            </div>
            }/>
  )
}


VInputSelectSearchRS.propTypes = {
  ...VInputTypes,

  prematureValidation : PropTypes.bool,
  placeholder  : PropTypes.string,
  options      : PropTypes.object,
  autocomplete : PropTypes.oneOf(["on", "off"]),
  clearable    : PropTypes.bool
}


VInputSelectSearchRS.defaultProps = {
  icon: 'search',
  prematureValidation: true
}

export default VInputSelectSearchRS