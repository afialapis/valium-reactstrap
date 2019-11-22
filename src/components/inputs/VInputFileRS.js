import React            from 'react'
import PropTypes        from 'prop-types'
import VInputAddon      from './VInputAddon'
import {VInputFile}     from 'valium'
import {Input}          from 'reactstrap'

import ProgressBar   from '../extra/ProgressBar'

class VInputFileRS extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      file       : undefined,
      progress   : undefined,
      content    : undefined,
      status     : undefined,
      status_msg : undefined     
    }
  }


  handleChange(e) {
    try {
      const reader = new FileReader()

      reader.onerror = (e) => {
        let st_msg=''
        
        switch (e.target.error.code) {
          case e.target.error.NOT_FOUND_ERR:
            st_msg= 'File not found!'
            break;
          case e.target.error.NOT_READABLE_ERR:
            st_msg = 'Unreadable file'
            break;
          case e.target.error.ABORT_ERR:
            break; // noop
          default:
            st_msg = 'Error reading file'
        }
        this.setState({
          status: 'error',
          status_msg: st_msg
        })
      };

      reader.onabort = (_e) => {
        this.setState({
          status     : 'abort',
          status_msg : 'Aborted',
          file       : undefined,
          progress   : undefined
        })
      }

      reader.onprogress = (e) => {
        // e is an ProgressEvent.
        if (e.lengthComputable) {
          this.setState({
            progress: Math.round((e.loaded / e.total) * 100)
          })
        }        
      }

      reader.onloadstart = (_e) => {
        this.setState({
          progress  : 0,
          status    : 'uploading',
          status_msg: 'Loading file'
        })
      }

      reader.onload = (e) => {
        this.setState({
          progress   : 100,
          status_msg : 'File loaded',
          content    : e.target.result
        })

        if (this.props.onLoad!=undefined) {
          this.props.onLoad(this.state.file, this.state.content)
        }
        if (this.props.onChange!=undefined) {
          const nfile= {
            name   : this.state.file.name,
            size   : this.state.file.size,
            type   : this.state.file.type,
            buffer : new Uint8Array(this.state.content)
          }
          this.props.onChange(nfile, this.props.name)
        }
      }

      this.setState({
        file: e.target.files[0]
      })      
      reader.readAsArrayBuffer(e.target.files[0]);
    } catch(e) {
      console.error(e)
      this.setState({
        file      : undefined,
        content   : undefined,
        status    : undefined,
        status_msg: undefined
      })
    }
  }

  get feedback() {
    if (this.state.status!=undefined)
      return (
        <ProgressBar progress={this.state.progress} label={this.state.status_msg}/>
      )
    return null
  }



  render() {
    const {name, value, defaultValue, label, icon, inline, readOnly, 
           required, checkValue, allowedValues, disallowedValues, checkValidityOnKeyup}= this.props

    let vprops= {}
    
    let nvalue= undefined
    if (defaultValue!=undefined) {
      //vprops.defaultValue= defaultValue || ''
      nvalue= defaultValue
    } else {
      //vprops.value= value
      nvalue= value
    }
    
    
    return (
      <VInputFile feedback        = {undefined} 
                 checkValue      = {checkValue}
                 allowedValues   = {allowedValues}
                 disallowedValues= {disallowedValues}
                 checkValidityOnKeyup= {checkValidityOnKeyup}
                 render  = {({valid, _message}, inputRef) => 
                  <VInputAddon name        = {name}
                              label       = {label}
                              //feedback    = {this.feedback}
                              value       = {nvalue}
                              icon        = {icon || 'file'}
                              isValid     = {valid}
                              inline      = {inline}>
                    <Input  name        = {name}
                            innerRef    = {inputRef}
                            type        = {"file"}
                            onChange    = {(e) => this.handleChange(e)}
                            readOnly    = {readOnly!=undefined ? readOnly  : false}
                            required    = {required}
                            valid       = {nvalue!=undefined && nvalue!='' && valid}
                            invalid     = {! valid}
                            {...vprops}
                    />
                  </VInputAddon>

                }
      />
    )
  }
}


VInputFileRS.propTypes = {
  name                : PropTypes.string.isRequired,
  /*
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
  */
  label               : PropTypes.string,
  icon                : PropTypes.string,
  inline              : PropTypes.bool,
  readOnly            : PropTypes.bool,
  required            : PropTypes.bool,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  onChange            : PropTypes.func,
}

export default VInputFileRS