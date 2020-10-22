import React   from 'react'
import PropTypes   from 'prop-types'
import {Input}     from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {useValueProps} from './value/useValueProps'
import {withValium} from './valium/withValium'


const _VInputNumber = (props) => {
  const {id, name, inputRef, placeholder, 
         readOnly, required, min, max, step,
         valid, autocomplete, 
         inputStyle}= props

  const [valueProps]= useValueProps(props)

  return (
    <Input  id          = {id}
            name        = {name}
            innerRef    = {inputRef}
            type        = {"text"}
            placeholder = {placeholder || ""}
            readOnly    = {readOnly!=undefined ? readOnly  : false}
            required    = {required}
            max         = {max}
            min         = {min}
            step        = {step || undefined}
            valid       = {valid}
            invalid     = {! valid}
            autoComplete= {autocomplete}
            style       = {inputStyle} 
            {...valueProps}
    />
  )
}


const VInputNumber = withValium(withAddon(_VInputNumber))


VInputNumber.propTypes = {
  ...inputPropTypes,
  defaultValue        : PropTypes.number,  
  placeholder         : PropTypes.string,
  max                 : PropTypes.number,
  min                 : PropTypes.number,
  step                : PropTypes.number,
  //pattern             : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
}

VInputNumber.defaultProps = {
  ...inputDefaultProps,
  icon: 'dollar',
  inputFilter: 'float'
}

export default VInputNumber