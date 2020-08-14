import React, {useRef, useState, useEffect}        from 'react'
import PropTypes     from 'prop-types'
import VInputAddon   from './base/VInputAddon'
import {Input, InputGroupAddon, InputGroupText}       from 'reactstrap'
import {vPropTypes, vDefaultProps}   from './base/inputProps'
import parseNumeric from './common/numeric'
import {withValue, withValium} from './base'

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



const _VInputSelectSearchRS = (props) => {
  const {id, name, options, label, feedback, icon, inline, 
         placeholder, readOnly, autocomplete, required,
         disallowedValues, keepHeight, formGroupStyle, inputGroupStyle,
         inputStyle, onChange, clearable, numeric, maxShownOptions,
         innerValue, /*innerProps,*/ message, valid, inputRef, setValidity
         } = props
  
  //console.log('----------------------- innerValue='+innerValue)
  const wrapperRef    = useRef(undefined)
  const filterRef     = useRef(undefined)
  const listRef       = useRef(undefined)

  const [isOpen, setIsOpen]= useState(false)
  const [shownText, setShownText]= useState(options[innerValue] || '')
  const [optionsMap, setOptionsMap]= useState([])


  const handleChange = (value) => {
    //console.log(`handleChange ${value}`)
    inputRef.current.value= value
    setValidity.current()
        
    if (onChange!=undefined) { 
      onChange(parseNumeric(numeric, value))
    } 
  }

  const onSearchStart = () => {
    if (! isOpen) {
      setIsOpen(true)
    }
  }

  const onSearchType = (ev) => {
    //console.log('SEARCH TYPE')
    setShownText(ev.target.value)
    onSearchStart()
  }

  const onSearchAbort = () => {
    setIsOpen(false)
    if (shownText=='') {
      handleChange('')
    }
  }

  const onSelect = (newValue) => {
    setIsOpen(false)
    //setShownText(options[newValue])
    handleChange(newValue)
  }

  const getListStyle= () => {
    // TODO
    // Check where this gap (13 / 6) comes from and try to make better
    if (filterRef.current) {  
      return {
        left: filterRef.current.parentNode.children[0].offsetWidth+13+'px',
        minWidth: filterRef.current.offsetWidth+'px',
        maxWidth: filterRef.current.offsetWidth+'px'
      }
    }
    return {}
  }


  useEffect(() => {
    const onClickOutside = (event) => {
      if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (listRef && listRef.current && !listRef.current.contains(event.target)) {
          //console.log('CLICK OUTSIDE, ABORT')
          onSearchAbort()
        }
      }    
    }    

    document.addEventListener('mousedown', onClickOutside)

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  })

  useEffect(() => {
    //console.log(`SETTING SHOWN ${options[innerValue] || ''}`)
    setShownText(options[innerValue] || '')
    // necessary?
    // setValidity.current()
  }, [options, innerValue])


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

  return (

      <div className="valium-reactstrap-select-search"
            ref = {wrapperRef}>
        <div>
          <VInputAddon name        = {name}
                      label       = {label}
                      feedback    = {isOpen ? undefined : (feedback==='no-feedback' ? undefined : feedback||message)}
                      value       = {innerValue}
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
                      defaultValue= {innerValue}/>
            <Input    name        = {`input_select_search_${name}_text`}
                      className   = "valium-reactstrap-select-search-text custom-select"
                      type        = "text"
                      innerRef    = {filterRef}
                      value       = {shownText}
                      placeholder = {placeholder}
                      readOnly    = {readOnly}
                      required    = {required}
                      valid       = {/*innerValue!=undefined && innerValue!='' &&*/ valid}
                      invalid     = {! valid}
                      onClick     = {(_ev) => onSearchStart()}
                      onChange    = {(ev) => onSearchType(ev)}
                      autoComplete= {autocomplete}
                      style       = {inputStyle} 
                      />

            {clearable
            ?  <InputGroupAddon onClick  = {() => {readOnly ? null : onSelect('')}}
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
              {optionsMap.map((opt, idx) =>  {
                if (idx<=(maxShownOptions-1)) {
                  return (
                    <div key     = {`${name}_option_${opt.value}`}
                          value   = {opt.value}
                          className={`valium-reactstrap-select-search-list-item list-group-item list-group-item-action ${opt.disabled ? 'disabled' : ''}`}
                          onClick = {(_ev) => !opt.disabled && onSelect(opt.value)}
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
  )
}

const VInputSelectSearchRS = withValue(withValium(_VInputSelectSearchRS, 'select'))


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