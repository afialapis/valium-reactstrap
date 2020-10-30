import React, {useRef, useCallback, useState, useEffect}  from 'react'
import PropTypes   from 'prop-types'
import {Input}     from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import isControlled from './helpers/isControlled'
import {withValium} from './valium/withValium'
import {useInputFilter} from 'valium'
import {countDecimals, useFloatSumProps } from './helpers/useNumberProps'



const _VInputWithFilter = ({className, inputFilter, placeholder, readOnly, valid, autocomplete, inputStyle, value, onChange, onKeyDown, focusIt, showValidity}) => {
  const reprRef = useRef(undefined)
  useInputFilter(reprRef, inputFilter)

  useEffect(() => {
    if (focusIt) {
      reprRef.current.focus()
    }
  }, [focusIt])

  const showValidProps = (showValidity==1 || showValidity==4)
  ? {valid: valid, invalid: ! valid}
  : {}


  return (
    <Input  
        className    = {className}
        type         = {"text"}
        innerRef     = {reprRef}
        placeholder  = {placeholder || ""}
        readOnly     = {readOnly!=undefined ? readOnly  : false}
        autoComplete = {autocomplete}
        style        = {inputStyle} 
        size         = {Math.max(value.length, 2)}
        value        = {value}
        onChange     = {(ev) => onChange(ev)}
        onKeyDown    = {(ev) => onKeyDown(ev)}
        {...showValidProps}
    />    
  )
}


const getInnerSum = (summed, innerValue) => {
  if (summed==undefined) {
    return ''
  }
  // Round sum to the max number of decimals
  const decs= innerValue.map((f) => countDecimals(f))
  const maxd= Math.max(...decs)
  return summed.toFixed(maxd)
}

const getInnerSumRepr = (innerSum, decimalSign) => {
  /*
  if (innerSum==undefined) {
    return ''
  }
  // Round sum to the max number of decimals
  const decs= innerValue.map((f) => countDecimals(f))
  const maxd= Math.max(...decs)
  return innerSum.toFixed(maxd).toString().replace('.', decimalSign)
  */
 return innerSum.toString().replace('.', decimalSign)
}

const _VInputFloatSum = (props) => {
  const {id, name, inputRef, valid, setValidity, 
         value, defaultValue, onChange,
         placeholder, readOnly, 
         required, min, max, step, decimals, decimalSign,
         autocomplete, inputStyle, showValidity}= props
  
  
  const [inputFilter, t]= useFloatSumProps(decimalSign)

  const controlled= isControlled(props)

  const [innerValue, setInnerValue]= useState(controlled ? value : defaultValue)
  const [innerSum, setInnerSum]    = useState(getInnerSum(t.sum(innerValue), innerValue))
  const [innerSumRepr, setInnerSumRepr]= useState(getInnerSumRepr(innerSum, decimalSign))
  const [innerRepr, setInnerRepr]  = useState(t.from(innerValue))
  
  const [inputWithFocus, setInputWithFocus]= useState(0)
  
  
  // Update innerValue if props changes
  useEffect(() => {
    const nInnerValue= controlled ? value : defaultValue
    if (innerValue != nInnerValue) {
      
      updInnerValue(nInnerValue, false)
    }
  }, [updInnerValue, innerValue, value, defaultValue, controlled])

  // Cascade when innerValue changes
  const updInnerValue = useCallback((nInnerValue, propagate) => {
    setInnerValue(nInnerValue)

    const nInnerSum= getInnerSum(t.sum(nInnerValue), nInnerValue)
    setInnerSum(nInnerSum)
    
    setInnerSumRepr(
      getInnerSumRepr(nInnerSum, decimalSign)
    )

    inputRef.current.value= nInnerSum

    if (propagate) {
      if (onChange!=undefined) {
        // TODO Expose some event? Makes sense?
        onChange(nInnerValue, undefined)
      }
    }
    setValidity()  
  }, [inputRef, t, onChange, setValidity, decimalSign])

  // Add a new input and focus it
  // innerRepr must be handled in paralell
  const addValue = useCallback((value, repr) => {
    const nInnerValue= [...innerValue]
    nInnerValue.push(value)
    updInnerValue(nInnerValue, true)
    
    const nInnerRepr= [...innerRepr]
    nInnerRepr.push(repr)
    setInnerRepr(nInnerRepr)

    setInputWithFocus(nInnerValue.length-1)
  }, [innerValue, innerRepr, updInnerValue])


  // Update an input's value and its repr
  // innerRepr must be handled in paralell
  const updValue = useCallback((value, repr, reprIdx) => {
    const nInnerValue= [...innerValue]
    nInnerValue[reprIdx]= value
    updInnerValue(nInnerValue, true)
    
    const nInnerRepr= [...innerRepr]
    nInnerRepr[reprIdx]= repr
    setInnerRepr(nInnerRepr)
    
  }, [innerValue, innerRepr, updInnerValue])


  // Remove an input's value and its repr
  // innerRepr must be handled in paralell  
  const remValue = useCallback((reprIdx) => {
    const nInnerValue= [...innerValue]
    nInnerValue.splice(reprIdx, 1)
    updInnerValue(nInnerValue, true)
    
    const nInnerRepr= [...innerRepr]
    nInnerRepr.splice(reprIdx, 1)
    setInnerRepr(nInnerRepr)

    setInputWithFocus(Math.max(reprIdx-1, 0))
  }, [innerValue, innerRepr, updInnerValue])

  // Increment current input's value
  // innerRepr must be handled in paralell  
  const incrValue = useCallback((factor, reprIdx) => {
      const curValue = innerValue[reprIdx] || 0.0
      const incr= step!=undefined
                  ? step
                  : 1.00
      let nValue= curValue + (factor*incr)
      updValue(nValue, t.from([nValue])[0], reprIdx)
  }, [updValue, innerValue, step , t])


  const handleChange = useCallback((event, reprIdx) => {
    const repr= event.target.value
    let value= 0
    try{
      value= t.to([repr])[0]
    } catch(e) {}
    updValue(value, repr, reprIdx)
  }, [updValue, t])


  const handleKeyDown = useCallback((event, reprIdx) => {
    // Simulate natives number input up/down
    if (event.key=='ArrowUp' || event.key=='ArrowDown') {
      event.preventDefault()
      const factor = event.key=='ArrowUp' ? 1 : -1
      incrValue(factor, reprIdx)
    }

    // Only allow to add new fields if we are in the last input
    if ( event.key=='+' || event.key=='-') {
      if (reprIdx == innerValue.length-1) {
        // If value is positive and key is '-' and we are at the inputs beginning,
        // means "change input's sign" instead of "add new"
        let changeSign= false
        if (event.key=='-' && event.target.value!='') {
          const f= parseFloat(event.target.value)
          if (f>0) {
            if (event.target.selectionStart==0) {
              changeSign= true
            }
          }
        }
        if (! changeSign) {
          const lastRepr= innerRepr.slice(-1)[0]
          if (lastRepr!='' && lastRepr!='0') {
            event.preventDefault()
            if (event.key=='+') {

              addValue(0, '0')
            } else {
              addValue(0, '-')
            }
          }
        }
      }
    }
    
    if (event.key=='Backspace' && event.target.value=='' && innerValue.length>1) {
      event.preventDefault()
      remValue(reprIdx)
    }

  }, [innerValue.length, innerRepr, incrValue, addValue, remValue])

  


  return (
    <div className  = "valium-reactstrap-float-sum">
      <input  type         = "number"
              id           = {id}
              name         = {name}
              ref          = {inputRef}
              style        = {{display: "none"}}
              required     = {required}
              max          = {max}
              min          = {min}
              decimals     = {decimals}
              defaultValue = {innerSum||''}/>
      
      {innerRepr.map((reprValue, reprIdx) => {
        return (
          <div className={`valium-reactstrap-float-sum-box ${ (innerValue[reprIdx] < 0 || reprValue[0]=='-') ? 'negative' : 'positive'}`}
              key      = {`valium-reactstrap-float-sum-${id || name}-repr-${reprIdx}`}>
  
            <_VInputWithFilter 
                    className    = "valium-reactstrap-float-sum-input"
                    inputFilter  = {inputFilter}
                    placeholder  = {placeholder || ""}
                    readOnly     = {readOnly!=undefined ? readOnly  : false}
                    valid        = {valid}
                    showValidity = {showValidity}
                    autocomplete = {autocomplete}
                    inputStyle   = {inputStyle} 
                    value        = {reprValue}
                    onChange     = {(ev) => handleChange(ev, reprIdx)}
                    onKeyDown    = {(ev) => handleKeyDown(ev, reprIdx)}
                    focusIt      = {inputWithFocus==reprIdx}
                    />
          </div>
        )
      }
      )}
      <div className="valium-reactstrap-float-sum-total">
        {isNaN(innerSum) ? '' : innerSumRepr}
      </div>    
    </div>
  )
}

const VInputFloatSum = withValium(withAddon(_VInputFloatSum))


VInputFloatSum.propTypes = {
  ...inputPropTypes,
  value               : function(props, _propName, _componentName) {
      if (! ('value' in props) && ! ('defaultValue' in props)) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  defaultValue        : PropTypes.arrayOf(PropTypes.number),
  placeholder         : PropTypes.string,
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  step                : PropTypes.number,
  decimals            : PropTypes.number,
  decimalSign         : PropTypes.oneOf([',', '.']),
  autocomplete        : PropTypes.oneOf(["on", "off"]),
}


VInputFloatSum.defaultProps = {
  ...inputDefaultProps,
  icon: "sigma",
  decimals: undefined,
  decimalSign: '.'
}



export default VInputFloatSum