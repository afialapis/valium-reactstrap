import React         from 'react'
import VInputAddon   from './VInputAddon'
import {VInput}      from 'valium'
import {CustomInput} from 'reactstrap'
import VInputTypes   from './common/VInputTypes'
import valueOrDef   from './common/valueOrDef'

let instanceCount= 1

const ProgressBar = ({progress}) => {
  const prg = progress!=undefined ? progress : 0
  const col = (progress == 100 ? '#00e64d' : '#ffcc00')

  return (
    <div className="bars" style={{ marginTop: "-1rem" }}>
      <div className="progress-xs  mb-0 progress" style={{height: "0.25em", backgroundColor: "transparent"}}>
        <div className={"progress-bar bg-"+col}
              style={{ width: prg+"%", backgroundColor: col }}
              role="progressbar"
              aria-valuenow={prg.toString()}
              aria-valuemin="0"
              aria-valuemax="100">
        </div>
      </div>
    </div>
  )
}

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
  
  render() {
    const {formUpdate, id, name, value, defaultValue, label, icon, inline, readOnly, 
           required, feedback, checkValue, allowedValues, disallowedValues, checkValidityOnKeyUp, keepHeight, formGroupStyle, inputGroupStyle}= this.props

    
    const [_vprops, nvalue]= valueOrDef(value, defaultValue)
        
    
    return (
      <VInput type            = {"file"} 
              feedback        = {feedback} 
              checkValue      = {checkValue}
              allowedValues   = {allowedValues}
              disallowedValues= {disallowedValues}
              checkValidityOnKeyUp= {checkValidityOnKeyUp}
              formUpdate      = {formUpdate}
              render  = {({valid, message}, inputRef) => 
                <>
                  <VInputAddon name        = {name}
                              label       = {label}
                              feedback    = {feedback || message}
                              value       = {nvalue}
                              icon        = {icon}
                              isValid     = {valid}
                              inline      = {inline}
                              keepHeight  = {keepHeight}
                              formGroupStyle = {formGroupStyle}
                              inputGroupStyle= {inputGroupStyle}>
                    {/**/}
                    <CustomInput  
                            id          = {id}
                            name        = {name}
                            // Do not lose the form-control class
                            // TODO maybe open PR on reactstrap?
                            className   = "form-control"
                            innerRef    = {inputRef}
                            type        = {"file"}
                            onChange    = {(e) => this.handleChange(e)}
                            readOnly    = {readOnly!=undefined ? readOnly  : false}
                            required    = {required}
                            valid       = {nvalue!=undefined && nvalue!='' && valid}
                            invalid     = {! valid}
                    />
                    
                  </VInputAddon>
                  {this.state.status!=undefined
                    ? <ProgressBar progress={this.state.progress}/>
                    : null
                  }
                </>
                }/>
    )
  }
}


VInputFileRS.propTypes = {
  ...VInputTypes,

}

VInputFileRS.defaultProps = {
  id: `valium-reactstrap-input-file-${instanceCount++}`,
  icon : 'file',
  checkValidityOnKeyUp: true
}

export default VInputFileRS