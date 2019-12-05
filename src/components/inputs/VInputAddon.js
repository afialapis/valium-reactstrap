import React from 'react'
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


class VInputAddon extends React.Component {

  constructor(props) {
    super(props)
    this.originalValue= props.value
  }

  get hasChanged() {
    return this.props.value != this.originalValue
  }

  render() {
    let {name, label, feedback, icon, isValid, children, inline, formClassName, keepHeight, formGroupStyle, inputGroupStyle} = this.props

    return (
      <FormGroup className={` ${this.hasChanged ? 'is-unsaved' : ''} ${inline ? 'inline' : ''} ${formClassName || ''}`}
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
        {(keepHeight || feedback) &&
          <VInputFeedback isValid={isValid}
                          feedback={feedback}
                          keepHeight={keepHeight}
                          />
        }
      </FormGroup>
    )
  }
}



export default VInputAddon