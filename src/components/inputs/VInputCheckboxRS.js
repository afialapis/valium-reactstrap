import React         from 'react'
import PropTypes     from 'prop-types'
import {VInput}      from 'valium'
import {CustomInput} from 'reactstrap'
import VInputAddon   from './VInputAddon'
import VInputTypes   from './common/VInputTypes'
import valueOrDef   from './common/valueOrDef'

let instanceCount= 1

const VInputCheckboxRS = ({formActions, id, name, value, defaultValue, label, description, feedback, icon, inline, readOnly, 
                      required, checkValue, allowedValues, disallowedValues, onChange, keepHeight, formGroupStyle, inputGroupStyle}) => {

  const [vprops, nvalue]= valueOrDef(value, defaultValue)

  return (
    <VInput type                 = {"checkbox"}
            feedback             = {feedback} 
            checkValue           = {checkValue}
            allowedValues        = {allowedValues}
            disallowedValues     = {disallowedValues}
            formActions          = {formActions}
            render  = {({valid, message}, inputRef) => 
              <VInputAddon name       = {name}
                          label       = {label}
                          feedback    = {feedback || message}
                          value       = {nvalue}
                          icon        = {icon}
                          isValid     = {valid}
                          inline      = {inline}
                          keepHeight  = {keepHeight}
                          formGroupStyle = {formGroupStyle}
                          inputGroupStyle= {inputGroupStyle}>
                <CustomInput  
                        id          = {id}
                        name        = {name}
                        innerRef    = {inputRef}
                        type        = {"switch"}
                        label       = {description}
                        onClick     = {(event) => {if (onChange!=undefined) { return onChange(event.target.checked)}}}
                        readOnly    = {readOnly!=undefined ? readOnly  : false}
                        required    = {required}
                        valid       = {nvalue!=undefined && nvalue!='' && valid}
                        invalid     = {! valid}
                        {...vprops}
                />
              </VInputAddon>

              }/>
  )
}




VInputCheckboxRS.propTypes = {
  ...VInputTypes,
  description         : PropTypes.string,
}

VInputCheckboxRS.defaultProps = {
  id: `valium-reactstrap-input-checkbox-${instanceCount++}`,
  icon: undefined
}


export default VInputCheckboxRS