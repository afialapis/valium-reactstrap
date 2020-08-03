import React, { useState, useEffect } from 'react'
import PropTypes    from 'prop-types'
import {vPropTypes, vDefaultProps}  from './base/inputProps'
import {withValue, withValium, withAddon} from './base'

let instanceCount= 1

const _VInputCheckboxRS = (props) => {
  const {id, name, inputRef, readOnly, required, 
         innerValue, innerProps, valid, inputStyle,
         onChange, description}= props
  
  const checkedProps= {
    checked: innerProps.value,
    defaultChecked: innerProps.defaultChecked
  }

  const [innerChecked, setInnerChecked]= useState(innerValue)
  
  useEffect(() => {
    setInnerChecked(innerValue)
  }, [innerValue])
  //}, [value, defaultValue])

  const handleClick = (ev, inputRef) => {
    const checked= !innerChecked
    inputRef.current.checked= checked
    setInnerChecked(checked)

    if (onChange!=undefined) {
      onChange(checked)
    }
  }


  return (    
    <div className    = "custom-switch custom-control"
          onClick     = {(event) => handleClick(event, inputRef)}
          /* better styling on the div, it is not very useful on the input here */
          style       = {inputStyle} > 
      <input type     = "checkbox" 
             id       = {id} 
             name     = {name} 
             className= {`custom-control-input ${innerChecked && valid ? 'is-valid' : ''} ${! valid ? 'is-invalid' : ''}`}
             ref      = {inputRef}
             readOnly = {readOnly!=undefined ? readOnly  : false}
             required = {required}
             onChange = {(event) => {if (onChange!=undefined) { return onChange(event.target.value)}}}
             {...checkedProps}
      />
      <label className="custom-control-label"
              htmlFor={id}>{description}</label>
    </div>            
   )
}


const VInputCheckboxRS= withValue(withValium(withAddon(_VInputCheckboxRS), 'checkbox'))


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

