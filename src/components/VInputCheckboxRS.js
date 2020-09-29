import React, { useState, useEffect } from 'react'
import PropTypes    from 'prop-types'
import {vPropTypes, vDefaultProps}  from './base/inputProps'
import {withAddon} from './addon/withAddon'
import {useInnerValue, withValium} from './base'

let instanceCount= 1

const _VInputCheckboxRS = (props) => {
  const {id, name, inputRef, readOnly, required, 
         valid, inputStyle,
         onChange, description}= props

  const [innerValue, valueProps]= useInnerValue(props)
  const [innerChecked, setInnerChecked]= useState(innerValue)

  const checkedProps= valueProps.defaultValue!=undefined
   ? {defaultChecked: innerValue}
   : {checked: innerValue || false} 
  
  useEffect(() => {
    setInnerChecked(innerValue)
  }, [innerValue])

  const handleChange = (ev) => {
    ev.stopPropagation()

    const checked= inputRef.current.checked
    setInnerChecked(checked)

    if (onChange!=undefined) {
      onChange(checked)
    }
  }

  return (    
    <div className    = "custom-switch custom-control"
          /* better styling on the div, it is not very useful on the input here */
         style        = {inputStyle} > 
      <input type     = "checkbox" 
             id       = {id} 
             name     = {name} 
             className= {`custom-control-input ${innerChecked && valid ? 'is-valid' : ''} ${! valid ? 'is-invalid' : ''}`}
             ref      = {inputRef}
             readOnly = {readOnly!=undefined ? readOnly  : false}
             required = {required}
             onChange = {(event) => handleChange(event)}
             {...checkedProps}
      />
      <label className="custom-control-label"
              htmlFor={id}>{description}</label>
    </div>            
   )
}


const VInputCheckboxRS= withValium(withAddon(_VInputCheckboxRS), 'checkbox')


VInputCheckboxRS.propTypes = {
  ...vPropTypes,
  description : PropTypes.string,
}

VInputCheckboxRS.defaultProps = {
  ...vDefaultProps,
  id: `valium-reactstrap-input-checkbox-${instanceCount++}`,
  icon: undefined
}

export default VInputCheckboxRS

