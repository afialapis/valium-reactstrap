import React, {useRef, useState, useEffect} from 'react'
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
      {feedback!=undefined && feedback!=""
       ? feedback
       : <>&nbsp;</>
      }
    </div>
  )
}

const VInputAddon = (props) => {
  const {name, value, label, description, feedback, icon, isValid, children, inline, formClassName, 
    showValidity, keepHeight, formGroupStyle, inputGroupStyle, middleElement}= props

  const originalValue = useRef(value)
  
  const [loaded, setLoaded]= useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const hasChanged= loaded && (value != originalValue.current)

  return (
    <FormGroup className={`valium-reactstrap-form-group ${hasChanged ? 'is-unsaved' : ''} ${inline===true ? 'inline' : ''} ${formClassName || ''}`}
               style={formGroupStyle}>
      {label!=undefined || description!=undefined
       ? <div className="valium-reactstrap-label-container">
          {label!=undefined
          ? <Label for={name}
                    className="valium-reactstrap-label">
              {label}
            </Label>
          : null
          }
          {description!=undefined
           ? 
            <div className="valium-reactstrap-description">
              {description}
            </div>
           : null}
        </div>
      : null}
      <InputGroup style={inputGroupStyle}>
        {icon===false
          ? null
          : 
          <InputGroupAddon addonType="prepend" className="input-group-addon">
            <InputGroupText>
              {icon==undefined
               ? ''
               : <VIcon icon={icon}/>
              }
            </InputGroupText>
          </InputGroupAddon>
        }
        {children}
      </InputGroup>
      {middleElement!=undefined
       ? middleElement
       : null
      }
      {((keepHeight===true || feedback!=undefined) && showValidity>=2)
        ? <VInputFeedback isValid={isValid}
                          feedback={feedback}
                          keepHeight={keepHeight}
                          />
        : null
      }
    </FormGroup>
  )
}

export {VInputAddon}