import React        from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './base/inputProps'
import {withValue, withValium, withAddon} from './base'

const _VInputColorRS = (props) => {
  const {id, name, inputRef, placeholder, 
    readOnly, required, valid, innerValue, innerProps,
    autocomplete, inputStyle}= props

  return (
    <Input  id          = {id}
            name        = {name}
            innerRef    = {inputRef}
            type        = {"color"}
            placeholder = {placeholder || ""}
            readOnly    = {readOnly!=undefined ? readOnly  : false}
            required    = {required}
            valid       = {innerValue!=undefined && innerValue!='' && valid}
            invalid     = {! valid}
            autoComplete= {autocomplete}
            style       = {inputStyle} 
            {...innerProps}
    />
  )
}

const VInputColorRS = withValue(withValium(withAddon(_VInputColorRS), 'color'))


VInputColorRS.propTypes = {
  ...vPropTypes,
  prematureValidation : PropTypes.bool,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputColorRS.defaultProps = {
  ...vDefaultProps,
  icon: 'color'
}



export default VInputColorRS