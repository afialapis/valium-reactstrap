import React, {useRef, useState, useEffect}        from 'react'
import PropTypes     from 'prop-types'
import VInputAddon   from './VInputAddon'
import {VInput}      from 'valium'
import {Input, InputGroupAddon, InputGroupText}       from 'reactstrap'
import {vPropTypes, vDefaultProps}   from './common/VInputProps'
import valueOrDef   from './common/valueOrDef'
import parseNumeric from './common/numeric'

/*
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);

      console.log('++ ' + (el.offsetLeft - xScroll + el.clientLeft))
      console.log(el)      
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);

      console.log('++ ' + (el.offsetLeft - el.scrollLeft + el.clientLeft))
      console.log(el)
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
*/

const numOrArrayToString = (v) => {
  if (Array.isArray(v)) {
    return v.map((a) => isNaN(a) ? '' : a.toString())
  }
  return isNaN(v) ? '' : v.toString()
}


const VInputSelectSearchRS = (
  {formActions, id, name, value, defaultValue, options, label, feedback, icon, inline, 
    placeholder, readOnly, autocomplete, required, checkValue, allowedValues, 
    disallowedValues, doRepeat, doNotRepeat, keepHeight, formGroupStyle, inputGroupStyle,
    inputStyle, onChange, clearable, numeric, maxShownOptions}) => {
  
  
  const [vprops, nvalue]= valueOrDef(value, defaultValue, numOrArrayToString)

  const setValidity   = useRef(undefined)
  const wrapperRef    = useRef(undefined)
  const filterRef     = useRef(undefined)
  const listRef       = useRef(undefined)

  const [isOpen, setIsOpen]= useState(false)
  const [shownText, setShownText]= useState('')
  const [optionsMap, setOptionsMap]= useState([])

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside)

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [])
  
  useEffect(() => {
    setShownText(options[nvalue] || '')
    // necessary?
    // setValidity.current()
  }, [nvalue])

  useEffect(() => {
    if (! isOpen) {
      setShownText(options[nvalue] || '')
    }
  }, [isOpen])

  useEffect(() => {
    // make options Map
    const nOptionsMap= []
    const sdisallowedValues= disallowedValues!=undefined ? disallowedValues.map((v) => v.toString()) : []
    const sfilter= shownText.toLowerCase() || ''
    for (const key in options) {
      const label= options[key]
      const match= sfilter.length>0 ? label.toLowerCase().includes(sfilter) : true
      if (match) {
        nOptionsMap.push({
          value: key,
          label: label,
          disabled: sdisallowedValues.indexOf(key)>=0
        })
      }
    }
    setOptionsMap(nOptionsMap)
  }, [options, disallowedValues, shownText])  

  const onClickOutside = (event) => {
    if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      if (listRef && listRef.current && !listRef.current.contains(event.target)) {
        onSearchAbort()
      }
    }    
  }

  const onSearchStart = () => {
    if (! isOpen) {
      setIsOpen(true)
    }
  }

  const onSearchType = (ev) => {
    setShownText(ev.target.value)
    onSearchStart()
  }

  const onSearchAbort = () => {
    setIsOpen(false)
  }

  const onSelect = (newValue, hiddenRef) => {
    hiddenRef.current.value= newValue
    setValidity.current()

    setIsOpen(false)
    
    if (onChange!=undefined) { 
      onChange(parseNumeric(numeric,newValue))
    }
  }

  const getListStyle= () => {
    // TODO
    // Check where tihis gap (13 / 6) comes from and try to make better
    if (filterRef.current) {  
      return {
        left: filterRef.current.parentNode.children[0].offsetWidth+13+'px',
        minWidth: filterRef.current.offsetWidth+4+'px'
      }
    }
    return {}
  }

  return (
    <VInput type            = {"select"}
            feedback        = {feedback} 
            checkValue      = {checkValue}
            allowedValues   = {allowedValues}
            disallowedValues= {disallowedValues}
            doRepeat        = {doRepeat}
            doNotRepeat     = {doNotRepeat}
            bindSetValidity = {(f) => {setValidity.current= f}}
            formActions     = {formActions}
            render          = {({valid, message}, inputRef) => 
            <div className="valium-reactstrap-select-search"
                  ref = {wrapperRef}>
              <div>
                <VInputAddon name        = {name}
                            label       = {label}
                            feedback    = {isOpen ? undefined : (feedback==='no-feedback' ? undefined : feedback||message)}
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
                            innerRef    = {filterRef}
                            value       = {shownText}
                            placeholder = {placeholder}
                            readOnly    = {readOnly}
                            required    = {required}
                            valid       = {nvalue!=undefined && nvalue!='' && valid}
                            invalid     = {! valid}
                            onClick     = {(_ev) => onSearchStart()}
                            onChange    = {(ev) => onSearchType(ev)}
                            autoComplete= {autocomplete}
                            style       = {inputStyle} 
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
              
                {isOpen
                ? <div className="valium-reactstrap-select-search-list list-group"
                       ref = {listRef}
                       style={getListStyle()}>
                    {optionsMap.map((opt, idx) =>  {
                      if (idx<=(maxShownOptions-1)) {
                        return (
                          <div key     = {`${name}_option_${opt.value}`}
                                value   = {opt.value}
                                className={`valium-reactstrap-select-search-list-item list-group-item list-group-item-action ${opt.disabled ? 'disabled' : ''}`}
                                onClick = {(_ev) => !opt.disabled && onSelect(opt.value, inputRef)}
                                >
                            {opt.label}
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
            }/>
  )
}


VInputSelectSearchRS.propTypes = {
  ...vPropTypes,

  prematureValidation : PropTypes.bool,
  placeholder  : PropTypes.string,
  options      : PropTypes.object,
  autocomplete : PropTypes.oneOf(["on", "off"]),
  clearable    : PropTypes.bool,
  numeric      : PropTypes.bool,
  maxShownOptions: PropTypes.number
}


VInputSelectSearchRS.defaultProps = {
  ...vDefaultProps,
  icon: 'search',
  maxShownOptions: 10
}

export default VInputSelectSearchRS