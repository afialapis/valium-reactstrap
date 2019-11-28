import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from 'reactstrap'

const VInputFeedback = ({show, children}) => {
  if (! show)
    return null;

  return (
    <div className="valium-reactstrap-feedback">
      {children}
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
    let {name, label, feedback, icon, isValid, children, inline, formClassName} = this.props

    return (
      <FormGroup className={` ${this.hasChanged ? 'is-unsaved' : ''} ${inline ? 'inline' : ''} ${formClassName || ''}`}>
        {label!=undefined
        ? <Label for={name}
                 className="valium-reactstrap-label">
            {label}
          </Label>
        : null
        }
        <div>
          <InputGroup style={this.props.inputGroupStyle}>
            <InputGroupAddon addonType="prepend" className="input-group-addon">
              <InputGroupText>
                <FontAwesomeIcon icon={icon || "align-justify"} />
              </InputGroupText>
            </InputGroupAddon>
            {children}
          </InputGroup>
          {feedback &&
            <VInputFeedback show={! isValid}>
              {feedback}
            </VInputFeedback>
          }
        </div>
      </FormGroup>
    )
  }
}



export default VInputAddon