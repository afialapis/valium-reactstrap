import React       from 'react'
import PropTypes   from 'prop-types'
import VInputAddon from './VInputAddon'
import {VInput}    from 'valium'
import DatePicker  from 'reactstrap-date-picker'
import VInputTypes from './common/VInputTypes'
import valueOrDef  from './common/valueOrDef'

class VInputDateRS extends React.Component {
  
  constructor(props) {
    super(props)
    this.state= {
      setValidity: undefined
    }    
  }

  render() {

    const {id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
                      required, checkValue, allowedValues, disallowedValues, keepHeight, formGroupStyle, inputGroupStyle} = this.props

    const [vprops, nvalue]= valueOrDef(value, defaultValue)

    const nInputGroupStyle ={
      ...inputGroupStyle,
      flexWrap: "unset"
    }

    return (
      <VInput type            = {"text"} 
              feedback        = {feedback} 
              checkValue      = {checkValue}
              allowedValues   = {allowedValues}
              disallowedValues= {disallowedValues}
              bindSetValidity = {(f) => this.setState({setValidity: f})}
              render  = {({valid, message}, inputRef) => 
                <VInputAddon name        = {name}
                            label       = {label}
                            feedback    = {feedback || message}
                            value       = {nvalue}
                            icon        = {icon}
                            isValid     = {valid}
                            inline      = {inline}
                            keepHeight  = {keepHeight}
                            inputGroupStyle= {nInputGroupStyle}
                            formGroupStyle={formGroupStyle}
                            >
                  <DatePicker id          = {id}
                              onChange    = {(v) => this.props.onChange(v)} 
                              weekStartsOn= {1} 
                              placeholder = {placeholder}
                              inputRef    = {inputRef}
                              dateFormat  = {"DD/MM/YYYY"}
                              readOnly    = {readOnly}
                              required    = {required}
                              autocomplete= {autocomplete}
                              
                              {...vprops} />
                </VInputAddon>
                }/>
    )
  }
}


VInputDateRS.propTypes = {
  ...VInputTypes,
  placeholder         : PropTypes.string,
  autocomplete        : PropTypes.oneOf(["on", "off"]),
}

VInputDateRS.defaultProps = {
  icon: 'calendar'
}


export default VInputDateRS