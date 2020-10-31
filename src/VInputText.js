import React        from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {useValueProps} from './value/useValueProps'
import {withValium} from './valium/withValium'


const _VInputText = (props) => {
  const {id, name, inputRef, inputType, placeholder, 
         readOnly, required, maxLength, minLength, 
         showValidProps,
         autocomplete, inputStyle, bsSize}= props
  
  const [valueProps]= useValueProps(props)
  
  return (
    <Input  id          = {id}
            name        = {name}
            innerRef    = {inputRef}
            type        = {inputType || "text"}
            placeholder = {placeholder || ""}
            readOnly    = {readOnly!=undefined ? readOnly  : false}
            required    = {required}
            maxLength   = {maxLength}
            minLength   = {minLength}
            autoComplete= {autocomplete}
            style       = {inputStyle} 
            bsSize      = {bsSize}
            {...valueProps}
            {...showValidProps}/>
   )
}


const VInputText= withValium(withAddon(_VInputText))


VInputText.propTypes = {
  ...inputPropTypes,

  inputType    : PropTypes.string,
  placeholder  : PropTypes.string,
  maxLength    : PropTypes.number,
  minLength    : PropTypes.number,
  inputFilter  : PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(RegExp), PropTypes.string]),
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputText.defaultProps = {
  ...inputDefaultProps,
  icon: 'text'
}


export default VInputText