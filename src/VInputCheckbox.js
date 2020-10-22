import React from 'react'
import PropTypes    from 'prop-types'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {useCheckedProps} from './value/useCheckedProps'
import {withValium} from './valium/withValium'


const _VInputCheckbox = (props) => {
  const [checkedProps]= useCheckedProps(props)

  const {id, name, inputRef, readOnly, required, 
    /*valid,*/ inputStyle, checkboxLabel}= props

  const makeId = () => {
    return id!=undefined 
           ? id
           : name !=undefined
             ? `valium-reactstrap-checkbox-${name}`
             : `unique_value_here_please`
  }

  return (    
    <div className    = "custom-switch custom-control"
          /* better styling on the div, it is not very useful on the input here */
          style        = {inputStyle} > 
          <input type     = "checkbox" 
                 id       = {makeId()} 
                 name     = {name} 
                 //className= {`custom-control-input ${valid ? 'is-valid' : 'is-invalid'}`}
                 className= {`custom-control-input`}
                 ref      = {inputRef}
                 readOnly = {readOnly!=undefined ? readOnly  : false}
                 required = {required}
                 {...checkedProps}
          />
          <label className="custom-control-label"
                  htmlFor={makeId()}>{checkboxLabel}</label>
        </div>            
       )
}

const VInputCheckbox= withValium(withAddon(_VInputCheckbox))


VInputCheckbox.propTypes = {
  ...inputPropTypes,
  checkboxLabel : PropTypes.string,
}

VInputCheckbox.defaultProps = {
  ...inputDefaultProps,
  icon: undefined
}

export default VInputCheckbox
