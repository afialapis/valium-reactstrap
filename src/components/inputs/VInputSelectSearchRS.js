import React         from 'react'
import PropTypes     from 'prop-types'
import VInputAddon   from './VInputAddon'
import {VInput}      from 'valium'
import {Input}       from 'reactstrap'
import VInputTypes   from './common/VInputTypes'
import valueOrDef   from './common/valueOrDef'

class VInputSelectSearchRS extends React.Component {
  
  constructor(props) {
    super(props)
    this.wrapperRef    = React.createRef()
    this.innerSearchRef= React.createRef()
    this.state= {
      isOpen: false,
      setValidity: undefined,
      filter: '',
      currentValue: props.defaultValue!=undefined ? props.defaultValue: props.value
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside.bind(this));
    this.innerSearchRef.current.value= this.props.options[this.state.currentValue]
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside.bind(this));
  }

  onClickOutside(event) {
    if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.onSearchAbort()
    }    
  }

  get optionsMap() {
    const {_allowedValues, disallowedValues, options}= this.props

    const sdisallowedValues= disallowedValues!=undefined ? disallowedValues.map((v) => v.toString()) : []
    let options_map= []
    
    const match= this.state.filter || ''

    for (const key in options) {
      const label= options[key]
      if (label.includes(match)) {
        options_map.push({
          value: key,
          label: label,
          disabled: sdisallowedValues.indexOf(key)>=0
        })
      }
    }
     return options_map
  }

  onSearchStart() {
    if (! this.state.isOpen) {
      this.setState({
        isOpen: true,
        filter: ''
      })
    }
  }

  onSearchType(ev) {
    this.setState({
      filter: ev.target.value
    })
  }

  onSearchAbort() {
    this.innerSearchRef.current.value= this.props.options[this.state.currentValue]
    this.setState({
      isOpen: false
    })
  }

  onSelect(value, hiddenRef) {
    
    this.innerSearchRef.current.value= this.props.options[value]
    hiddenRef.current.value= value
    this.state.setValidity()


    this.setState({
      isOpen: false,
      currentValue: value
    })

    if (this.props.onChange!=undefined) { 
      this.props.onChange(value)
    }
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    if (this.props.value != prevProps.value) {
      this.innerSearchRef.current.value= this.props.options[this.props.value]
      this.state.setValidity()
    } else if (this.props.defaultValue != prevProps.defaultValue ) {
      this.innerSearchRef.current.value= this.props.options[this.props.defaultValue]
      this.state.setValidity()
    }    
  }

  render() {
    const {id, name, value, defaultValue, label, feedback, icon, inline, placeholder, readOnly, autocomplete,
          required, checkValue, allowedValues, disallowedValues, keepHeight, formGroupStyle, inputGroupStyle}= this.props

    const [vprops, nvalue]= valueOrDef(value, defaultValue)

    return (

      <VInput type            = {"select"}
              feedback        = {feedback} 
              checkValue      = {checkValue}
              allowedValues   = {allowedValues}
              disallowedValues= {disallowedValues}
              bindSetValidity = {(f) => this.setState({setValidity: f})}
              render          = {({valid, message}, inputRef) => 
              <div className="valium-reactstrap-select-search"
                    ref = {this.wrapperRef}>
                <div>
                  <VInputAddon name        = {name}
                              label       = {label}
                              feedback    = {this.state.isOpen ? undefined : (feedback || message)}
                              value       = {nvalue}
                              icon        = {icon}
                              isValid     = {valid}
                              inline      = {inline}
                              keepHeight  = {keepHeight}
                          formGroupStyle  = {formGroupStyle}
                          inputGroupStyle = {inputGroupStyle}>
                    <Input    id          = {id}
                              name        = {name}
                              className   = "valium-reactstrap-select-search-hidden"
                              type        = "hidden"
                              innerRef    = {inputRef}
                              required    = {required}
                              /*onChange    = {(_ev) => console.log('HEY HEY HEY HEY')}*/
                              {...vprops}/>
                    <Input    name        = {`input_select_search_${name}_text`}
                              className   = "valium-reactstrap-select-search-text custom-select"
                              type        = "text"
                              innerRef    = {this.innerSearchRef}
                              placeholder = {placeholder}
                              readOnly    = {readOnly}
                              required    = {required}
                              valid       = {nvalue!=undefined && nvalue!='' && valid}
                              invalid     = {! valid}
                              onClick     = {(_ev) => this.onSearchStart()}
                              onKeyUp     = {(ev) => {this.onSearchStart(); this.onSearchType(ev)}}
                              autoComplete= {autocomplete}
                              />
                  </VInputAddon>
                </div>
                <div>
                  {this.state.isOpen
                  ? <div className="valium-reactstrap-select-search-list list-group">
                      {this.optionsMap.map((opt) => 
                        <div key     = {`${name}_option_${opt.value}`}
                              value   = {opt.value}
                              disabled= {opt.disabled}
                              className="valium-reactstrap-select-search-list-item list-group-item list-group-item-action" 
                              onClick = {(_ev) => this.onSelect(opt.value, inputRef)}
                              >
                          {opt.label}
                        </div>
                      )}
                    </div>
                  : null
                  }
                </div>
              </div>
              }/>
    )
  }
}


VInputSelectSearchRS.propTypes = {
  ...VInputTypes,

  placeholder  : PropTypes.string,
  options      : PropTypes.object,
  autocomplete : PropTypes.oneOf(["on", "off"]),
}


VInputSelectSearchRS.defaultProps = {
  icon: 'search'
}

export default VInputSelectSearchRS