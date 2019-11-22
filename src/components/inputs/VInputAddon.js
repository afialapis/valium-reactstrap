import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Label
} from 'reactstrap'

const VInputFeedback = ({show, color, children}) => {
  if (! show)
    return null;

  return (
    <div className="sform-reactstrap-feedback" style={{ ...(color!=undefined && {color: color}) }}>
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
        ? <Label for={name}>
            {label}
          </Label>
        : null
        }
        <div>
          <InputGroup>
            <InputGroupAddon addonType="prepend" className="input-group-addon">
              <FontAwesomeIcon icon={icon || "align-justify"} className="fa-1_5x" />
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