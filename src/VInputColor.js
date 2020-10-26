import React        from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {inputPropTypes}  from './props/inputPropTypes'
import {inputDefaultProps} from './props/inputDefaultProps'
import {withAddon} from './addon/withAddon'
import {useValueProps} from './value/useValueProps'
import {withValium} from './valium/withValium'

const _VInputColor = (props) => {
  const {id, name, inputRef, placeholder, 
    readOnly, required,
    autocomplete, inputStyle, showValidProps}= props  
  
  const [valueProps]= useValueProps(props)

  return (
    <Input  id          = {id}
            name        = {name}
            innerRef    = {inputRef}
            type        = {"color"}
            placeholder = {placeholder || ""}
            readOnly    = {readOnly!=undefined ? readOnly  : false}
            required    = {required}
            autoComplete= {autocomplete}
            style       = {inputStyle} 
            {...valueProps}
            {...showValidProps}
    />
  )
}

const VInputColor = withValium(withAddon(_VInputColor))


VInputColor.propTypes = {
  ...inputPropTypes,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}

VInputColor.defaultProps = {
  ...inputDefaultProps,
  icon: 'color'
}



export default VInputColor