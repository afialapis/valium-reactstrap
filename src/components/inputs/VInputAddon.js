import React, {useRef} from 'react'
import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from 'reactstrap'
import VIcon from '../icons'

const VInputFeedback = ({isValid, feedback, keepHeight}) => {
  const show= keepHeight || (! isValid && feedback)
  if (! show)
    return null;

  return (
    <div className={`valium-reactstrap-feedback ${isValid ? 'hidden' : ''}`}>
      {feedback || "_"}
    </div>
  )
}


const VInputAddon = ({name, value, label, feedback, icon, isValid, children, inline, formClassName, keepHeight, formGroupStyle, inputGroupStyle, middleElement}) => {

  const originalValue= useRef(value)

  const hasChanged= (value != originalValue.current)
  
  return (
    <FormGroup className={`valium-reactstrap-form-group ${hasChanged ? 'is-unsaved' : ''} ${inline ? 'inline' : ''} ${formClassName || ''}`}
               style={formGroupStyle}>
      {label!=undefined
      ? <Label for={name}
                className="valium-reactstrap-label">
          {label}
        </Label>
      : null
      }
      <InputGroup style={inputGroupStyle}>
        {icon==undefined
          ? null
          : 
          <InputGroupAddon addonType="prepend" className="input-group-addon">
            <InputGroupText>
              <VIcon icon={icon}/>
            </InputGroupText>
          </InputGroupAddon>
        }
        {children}
      </InputGroup>
      {middleElement!=undefined
       ? middleElement
       : null
      }
      {(keepHeight || feedback) &&
        <VInputFeedback isValid={isValid}
                        feedback={feedback}
                        keepHeight={keepHeight}
                        />
      }
    </FormGroup>
  )
}



export default VInputAddon