import React, {useCallback}        from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './base/inputProps'
import {withAddon} from './addon/withAddon'
import {useInnerValue, withValium} from './base'

const _VInputTimeRS = (props) => {
  const {id, name, inputRef, placeholder, 
    readOnly, required, valid, onChange,
    autocomplete, inputStyle}= props

  const [innerValue, valueProps]= useInnerValue(props)


  const handleChange = useCallback((event) => {
    const value= event.target.value
    if (onChange!=undefined) {
      onChange(value)
    }
  }, [onChange])  

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
              onChange    = {handleChange}
              {...valueProps}
    />
  )
}

const VInputTimeRS = withValium(withAddon(_VInputTimeRS), 'text')

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