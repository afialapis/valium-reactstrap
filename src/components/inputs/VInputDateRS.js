import React         from 'react'
import PropTypes     from 'prop-types'
import VInputAddon   from './VInputAddon'
import {VInputDate}  from 'valium'
import  DatePicker   from 'reactstrap-date-picker'

class VInputDateRS extends React.Component {
  
  constructor(props) {
    super(props)
    this.state= {
      setValidity: undefined
    }    
  }

  render() {

    const {name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, 
                      required, checkValue, allowedValues, disallowedValues} = this.props

    let vprops= {}
    let nvalue= undefined
    if (defaultValue!=undefined) {
      vprops.defaultValue= defaultValue || ''
      nvalue= defaultValue
    } else {
      vprops.value= value
      nvalue= value
    }

    return (
      <VInputDate feedback        = {feedback} 
                checkValue      = {checkValue}
                allowedValues   = {allowedValues}
                disallowedValues= {disallowedValues}
                bindSetValidity = {(f) => this.setState({setValidity: f})}
                render  = {({valid, message}, inputRef) => 
                  <VInputAddon name        = {name}
                              label       = {label}
                              feedback    = {feedback || message}
                              value       = {nvalue}
                              icon        = {icon || 'calendar'}
                              isValid     = {valid}
                              inline      = {inline}
                              inputGroupStyle= {{flexWrap: "unset"}}
                              >
                    <DatePicker onChange    = {(v) => this.props.onChange(v)} 
                                weekStartsOn= {1} 
                                placeholder = {placeholder}
                                inputRef    = {inputRef}
                                dateFormat  = {"DD/MM/YYYY"}
                                
                                {...vprops} />
                  </VInputAddon>
                }
      />
    )
  }
}


VInputDateRS.propTypes = {
  name                : PropTypes.string.isRequired,
  value               : function(props, _propName, _componentName) {
      if (! ('value' in props) && ! ('defaultValue' in props)) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  defaultValue        : PropTypes.string,
  label               : PropTypes.string,
  feedback            : PropTypes.string,
  icon                : PropTypes.string,
  inline              : PropTypes.bool,
  placeholder         : PropTypes.string,
  readOnly            : PropTypes.bool,
  required            : PropTypes.bool,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  checkValidityOnKeyup: PropTypes.bool,
  onChange            : PropTypes.func,
}

export default VInputDateRS