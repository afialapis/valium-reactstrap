import React            from 'react'
import PropTypes        from 'prop-types'
import VInputAddon      from './VInputAddon'
import {VInputDate}     from 'valium'
import {Input}          from 'reactstrap'


class VInputDateRS extends React.Component {
  
  constructor(props) {
    super(props)
    this.dateLabelRef= React.createRef()
    this.state= {
      setValidity: undefined
    }    
  }

  componentDidMount() {
    this.dateLabelRef.current.value= this.props.defaultValue!=undefined ? this.props.defaultValue: this.props.value
  }
  
  onChange(value, hiddenRef) {
    
    this.dateLabelRef.current.value= value
    hiddenRef.current.value= value
    this.state.setValidity()

    if (this.props.onChange!=undefined) { 
      this.props.onChange(value)
    }
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    if (this.props.value != prevProps.value) {
      this.dateLabelRef.current.value= this.props.value
      this.state.setValidity()
    } else if (this.props.defaultValue != prevProps.defaultValue ) {
      this.dateLabelRef.current.value= this.props.defaultValue
      this.state.setValidity()
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
                  <div className="sform-reactstrap-date">
                    <VInputAddon name        = {name}
                                label       = {label}
                                feedback    = {feedback || message}
                                value       = {nvalue}
                                icon        = {icon || 'calendar'}
                                isValid     = {valid}
                                inline      = {inline}>
                      <Input    name        = {name}
                                className   = "sform-reactstrap-date-hidden"
                                type        = "hidden"
                                innerRef    = {inputRef}
                                required    = {required}
                                onChange    = {(_ev) => console.log('HEY HEY HEY HEY')}
                                valid       = {nvalue!=undefined && nvalue!='' && valid}
                                invalid     = {! valid}
                                {...vprops}/>
                      <Input  name        = {name}
                              className   = "sform-reactstrap-date-shown"
                              type        = {"text"}
                              innerRef    = {this.dateLabelRef}
                              placeholder = {placeholder || ""}
                              pattern     = {"(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).(19|20)[0-9]{2}"}
                      />
                      <Input  name        = {name}
                              className   = "sform-reactstrap-date-date"
                              type        = {"date"}
                              onChange    = {(ev) => this.onChange(ev.target.value, inputRef)}
                              readOnly    = {readOnly!=undefined ? readOnly  : false}
                      />
                    
                    </VInputAddon>
                  </div>

                }
      />
    )
  }
}


VInputDateRS.propTypes = {
  name                : PropTypes.string.isRequired,
  value               : function(props, _propName, _componentName) {
      if (props['defaultValue'] == undefined && props['value'] == undefined) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  defaultValue        : function(props, _propName, _componentName) {
    if (props['defaultValue'] == undefined && props['value'] == undefined) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
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