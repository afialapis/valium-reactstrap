import React        from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {useValueProps} from './value/useValueProps'
import {withValium} from './valium/withValium'

const _VInputTime = (props) => {
  const {id, name, inputRef, placeholder, 
    readOnly, required, valid,
    autocomplete, inputStyle}= props

  const [valueProps]= useValueProps(props)


  return (
      <Input  id          = {id}
              name        = {name}
              innerRef    = {inputRef}
              type        = {"time"}
              placeholder = {placeholder || ""}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              required    = {required}
              valid       = {valid}
              invalid     = {! valid}
              autoComplete= {autocomplete}
              style       = {inputStyle} 
              {...valueProps}
    />
  )
}

const VInputTime = withValium(withAddon(_VInputTime))

VInputTime.propTypes = {
  ...inputPropTypes,
  placeholder  : PropTypes.string,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputTime.defaultProps = {
  ...inputDefaultProps,
  icon: 'time'
}


export default VInputTime