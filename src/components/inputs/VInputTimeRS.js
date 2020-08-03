import React        from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './base/inputProps'

import {withValue, withValium, withAddon} from './base'

const _VInputTimeRS = (props) => {
  const {id, name, inputRef, placeholder, 
    readOnly, required, valid, innerValue, innerProps,
    autocomplete, inputStyle}= props

  return (
      <Input  id          = {id}
              name        = {name}
              innerRef    = {inputRef}
              type        = {"time"}
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

const VInputTimeRS = withValue(withValium(withAddon(_VInputTimeRS), 'text'))

VInputTimeRS.propTypes = {
  ...vPropTypes,
  prematureValidation : PropTypes.bool,
  placeholder  : PropTypes.string,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputTimeRS.defaultProps = {
  ...vDefaultProps,
  icon: 'time'
}


export default VInputTimeRS