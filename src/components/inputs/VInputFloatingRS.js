import React, {useState, useEffect} from 'react'
import PropTypes   from 'prop-types'
import VInputAddon from './VInputAddon'
import {VInput}    from 'valium'
import {Input}     from 'reactstrap'
import {vPropTypes, vDefaultProps} from './common/VInputProps'
// import valueOrDef   from './common/valueOrDef'


const _ALLOW_KEYS= ['0','1','2','3','4','5','6','7','8','9']

const asString = (v) => {
  if (v==undefined) {
    return ''
  }
  return v.toString().replace('.',',')
}

const asFloat = (s) => {
  const v= s.toString().replace(',','.')
  let f= parseFloat(v).toFixed(2)
  if (isNaN(f))
    return 0.0
  return f
}

const isValidFormat= (s) => {
  if (s=='')
    return true
  let f = s.toString().replace(',', '.')
  f = parseFloat(f)
  if (isNaN(f))
  {
    return false
  }
  return true
}


const VInputFloatingRS = (
  {formActions, id, name, value, defaultValue, label, feedback, icon, inline, 
    placeholder, readOnly, autocomplete, required, max, min, decimalChars,
    checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, 
    onChange, prematureValidation, keepHeight, formGroupStyle, inputGroupStyle, inputStyle}) => {

  /// const [vprops, nvalue]= valueOrDef(value, defaultValue, asString)

  const [innerValue, setInnerValue] = useState(defaultValue!=undefined ? asString(defaultValue) : asString(value))
  const [controlled, setControlled]= useState(defaultValue==undefined)
  const [confirmed , setConfirmed ] = useState(false)
  const [innerValid , setInnerValid ] = useState(true)

  useEffect(() => {

    let nInnerValid= true
    if (! isValidFormat(innerValue)) {
      nInnerValid= false
    } else {
      if (innerValue=='' && required) {
        nInnerValid= false
      } else {
        const f= asFloat(innerValue)
        if (f<min || f>max) {
          nInnerValid= false
        }
      }
    }
    setInnerValid(nInnerValid)
  }, [innerValue])

  const handleChange = (e) => {

    if (innerValue != e.target.value) {
      setConfirmed(false)

      setInnerValue(e.target.value)
      if (onChange!=undefined) {
        onChange(asFloat(e.target.value), false)
      }
    }
  }

  const handleKeyPress = (e) => {
    let start = e.target.selectionStart,
        end = e.target.selectionEnd
    const allow= [..._ALLOW_KEYS, ...decimalChars]

    if (allow.indexOf(e.key) < 0 || ! isValidFormat(e.target.value) ) {
      e.preventDefault();
      e.target.setSelectionRange(start, end);
    }
  }

  const handleBlur = (e) => {
    if (! confirmed) {
      onChange(asFloat(e.target.value), true)
      setConfirmed(true)
    }
  }


  return (
    <VInput type               = {"number"}
            feedback           = {feedback} 
            checkValue         = {checkValue}
            allowedValues      = {allowedValues}
            disallowedValues   = {disallowedValues}
            doRepeat           = {doRepeat}
            doNotRepeat        = {doNotRepeat}
            prematureValidation= {prematureValidation}
            formActions        = {formActions}
            render             = {({valid, message}, inputRef) => 
              <VInputAddon name        = {name}
                          label       = {label}
                          feedback    = {feedback==='no-feedback' ? undefined : feedback||message}
                          value       = {innerValue}
                          icon        = {icon}
                          isValid     = {valid}
                          inline      = {inline}
                          keepHeight  = {keepHeight}
                          formGroupStyle = {formGroupStyle}
                          inputGroupStyle= {inputGroupStyle}>
                <Input  id          = {id}
                        name        = {name}
                        innerRef    = {inputRef}
                        placeholder = {placeholder || ""}
                        onChange    = {(event) => handleChange(event)}
                        onKeyPress  = {(event) => handleKeyPress(event)}
                        onBlur      = {(event) => handleBlur(event)}
                        readOnly    = {readOnly!=undefined ? readOnly  : false}
                        required    = {required}
                        valid       = {innerValid}
                        invalid     = {! valid}
                        autoComplete= {autocomplete}
                        style       = {inputStyle} 
                        value       = {innerValue}
                        {... controlled
                         ? {value       : innerValue}
                         : {defaultValue: innerValue}}
                />
              </VInputAddon>

            }/>
  )
}


VInputFloatingRS.propTypes = {
  ...vPropTypes,
  prematureValidation : PropTypes.bool,
  placeholder         : PropTypes.string,
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
  decimalChars        : PropTypes.arrayOf(PropTypes.string)
}

VInputFloatingRS.defaultProps = {
  ...vDefaultProps,
  icon: 'dollar',
  decimalChars: [',', '.']
}

export default VInputFloatingRS