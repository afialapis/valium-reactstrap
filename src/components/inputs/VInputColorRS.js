import React, {useCallback} from 'react'
import PropTypes    from 'prop-types'
import {Input}      from 'reactstrap'
import {vPropTypes, vDefaultProps}  from './base/inputProps'
import {useInnerValue, withValium, withAddon} from './base'

const _VInputColorRS = (props) => {
  const {id, name, inputRef, placeholder, 
    readOnly, required, valid,
    autocomplete, inputStyle, onChange}= props

  const [innerValue, valueProps]= useInnerValue(props)

  const handleChange = useCallback((event) => {
      const value= event.target.value
      if (onChange!=undefined) {
        onChange(value)
      }
    }, [onChange]
  )


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
            onChange    = {handleChange}
            {...valueProps}
            
    />
  )
}

const VInputColorRS = withValium(withAddon(_VInputColorRS), 'color')


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