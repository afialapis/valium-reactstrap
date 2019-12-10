import React, {useState}         from 'react'
import PropTypes   from 'prop-types'
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
    <div className="bars valium-reactstrap-progress">
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

const VInputFileRS = ({formActions, id, name, value, defaultValue, label, icon, inline, readOnly, 
                       required, feedback, checkValue, allowedValues, disallowedValues, prematureValidation, 
                       keepHeight, formGroupStyle, inputGroupStyle, onLoad, onChange}) => {

                       
  const [progress  , setProgress ]= useState(undefined)
  const [status    , setStatus   ]= useState(undefined)
  const [statusMsg , setStatusMsg]= useState(undefined)
  


  const handleChange = (ev) => {
    ev.persist()

    const file= ev.target.files[0]

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
        setStatus('error')
        setStatusMsg(st_msg)
      };

      reader.onabort = (_e) => {
        setStatus('abort')
        setStatusMsg('Aborted')
        setProgress(undefined)
      }

      reader.onprogress = (e) => {
        // e is an ProgressEvent.
        if (e.lengthComputable) {
          setProgress( Math.round((e.loaded / e.total) * 100))
        }        
      }

      reader.onloadstart = (_e) => {
        setProgress(0)
        setStatus('uploading')
        setStatusMsg('Loading file')
      }

      reader.onload = (e) => {
        setProgress(100)
        setStatusMsg('File loaded')

        if (onLoad!=undefined) {
          onLoad(file, e.target.result)
        }
        if (onChange!=undefined) {
          const nfile= {
            name   : file.name,
            size   : file.size,
            type   : file.type,
            buffer : new Uint8Array(e.target.result)
          }
          onChange(nfile)
        }
      }

      
      reader.readAsArrayBuffer(ev.target.files[0])
    } catch(e) {
      console.error(e)
      setStatus(undefined)
      setStatusMsg(undefined)
    }
  }
  
  const [_vprops, nvalue]= valueOrDef(value, defaultValue)
        
  
  return (
    <VInput type               = {"file"} 
            feedback           = {feedback} 
            checkValue         = {checkValue}
            allowedValues      = {allowedValues}
            disallowedValues   = {disallowedValues}
            prematureValidation= {prematureValidation}
            formActions        = {formActions}
            render  = {({valid, message}, inputRef) => 
                <VInputAddon name        = {name}
                            label       = {label}
                            feedback    = {feedback || message}
                            value       = {nvalue}
                            icon        = {icon}
                            isValid     = {valid}
                            inline      = {inline}
                            keepHeight  = {keepHeight}
                            formGroupStyle = {formGroupStyle}
                            inputGroupStyle= {inputGroupStyle}
                            middleElement= {status!=undefined
                                            ? <ProgressBar progress={progress}/>
                                            : null}
                            >
                  <CustomInput  
                          id          = {id}
                          name        = {name}
                          // Do not lose the form-control class
                          // TODO maybe open PR on reactstrap?
                          className   = "form-control"
                          innerRef    = {inputRef}
                          type        = {"file"}
                          onChange    = {(e) => handleChange(e)}
                          readOnly    = {readOnly!=undefined ? readOnly  : false}
                          required    = {required}
                          valid       = {nvalue!=undefined && nvalue!='' && valid}
                          invalid     = {! valid}
                  />
                  
                </VInputAddon>
              }/>
  )
}


VInputFileRS.propTypes = {
  ...VInputTypes,
  onLoad: PropTypes.func
}

VInputFileRS.defaultProps = {
  id: `valium-reactstrap-input-file-${instanceCount++}`,
  icon : 'file',
  prematureValidation: true
}

export default VInputFileRS