import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from 'reactstrap'

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
    this.originalValue = props.value
  }

  get hasChanged() {
    return this.props.value != this.originalValue
  }

  render() {
    let {name, label, feedback, icon, isValid, children, inline, formClassName, keepHeight} = this.props

    return (
      <FormGroup className={` ${this.hasChanged ? 'is-unsaved' : ''} ${inline ? 'inline' : ''} ${formClassName || ''}`}>
        {label!=undefined
        ? <Label for={name}
                 className="valium-reactstrap-label">
            {label}
          </Label>
        : null
        }
        <InputGroup style={this.props.inputGroupStyle}>
          {icon==undefined
            ? null
            : 
            <InputGroupAddon addonType="prepend" className="input-group-addon">
              <InputGroupText>
                <FontAwesomeIcon icon={icon || "align-justify"} />
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