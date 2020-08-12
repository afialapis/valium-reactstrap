import React, {useState} from 'react'
import PropTypes from 'prop-types'
import VInputAddon from './base/VInputAddon'
import {InputGroupAddon, InputGroupText}     from 'reactstrap'
import {vPropTypes, vDefaultProps}   from './base/inputProps'
import {withValue, withValium} from './base'

let instanceCount= 1

const ProgressBar = ({progress}) => {
  const prg = progress!=undefined ? progress : 0
  const col = (progress == 100 ? '#00e64d' : '#ffcc00')

  return (
    <div className="bars valium-reactstrap-progress"
         style={{position: "relative",
                 width: "calc(100% - 77px)",
                 left: "42px",
                 top: "-3px",
                 zIndex: "5"}}>
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

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const getIcon = (mtype, icon, iconMap) => {
  if (iconMap) {
    const i1= iconMap[mtype]
    if (i1) { return i1}
  }
  if (icon) {
    return icon
  }
  return 'file'
}

const _VInputFileRS = (props) => {
  const {id, name, label, icon, inline, readOnly, 
         required, feedback, keepHeight, formGroupStyle, inputGroupStyle, 
         inputStyle, onLoad, onChange, onDownload, accept, iconMap,
         innerValue, setValidity, valid, message, inputRef} = props


  const [progress  , setProgress ]= useState(undefined)
  const [status    , setStatus   ]= useState(undefined)
  // const [statusMsg , setStatusMsg]= useState(undefined)

  const hasValue = () => {
    return innerValue?.buffer || innerValue?.size>0
  }

  const handleChange = (ev) => {
    ev.persist()

    const file= ev.target.files[0]

    try {
      const reader = new FileReader()

      reader.onerror = (_e) => {
        /*
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
        setStatusMsg(st_msg)
        */

        setStatus('error')
      };

      reader.onabort = (_e) => {
        setStatus('abort')
        // setStatusMsg('Aborted')
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
        // setStatusMsg('Loading file')
      }

      reader.onload = (e) => {
        setProgress(100)
        // setStatusMsg('File loaded')

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
      // setStatusMsg(undefined)
    }
  }

  const clear = (inputRef) => {
    inputRef.current.value= ''
    setValidity.current()
    setProgress(0)
    if (onChange!=undefined) {
      onChange({})
    }
  }  
  
  const browse = (inputRef) => {
    let evt = document.createEvent("MouseEvents")
    evt.initEvent("click", true, false)
    inputRef.current.dispatchEvent(evt)    
  }

  const download = (inputRef, ev) => {
    if (onDownload != undefined) {
      onDownload(inputRef, ev)
    }
  }

  return (

    <VInputAddon name        = {name}
                label       = {label}
                feedback    = {feedback==='no-feedback' ? undefined : feedback||message}
                value       = {innerValue}
                icon        = {getIcon(innerValue?.type, icon, iconMap)}
                isValid     = {valid}
                inline      = {inline}
                keepHeight  = {keepHeight}
                formGroupStyle = {formGroupStyle}
                inputGroupStyle= {inputGroupStyle}
                middleElement  = {status!=undefined
                                ? <ProgressBar progress={progress}/>
                                : null}
                >
      {/* Hidden file input*/}
      <input  style       = {{zIndex: "0", display: "inline", opacity: "0", visibility: "hidden"}}
              id          = {id}
              name        = {name}
              // Do not lose the form-control class
              // TODO maybe open PR on reactstrap?
              className   = "form-control"
              ref         = {inputRef}
              type        = {"file"}
              onChange    = {(e) => handleChange(e)}
              readOnly    = {readOnly!=undefined ? readOnly  : false}
              required    = {required}
              //valid       = {nvalue!=undefined && nvalue!='' && valid}
              //invalid     = {! valid}
              accept      = {accept}
      />
      <div  style       = {{opacity  : "1", 
                            zIndex    : "3", 
                            position  : "absolute", 
                            width     : valid ? "calc(100% - 75px)" : "calc(100% - 77px)", 
                            left      : "42px", 
                            display   : "flex",
                            cursor    : 'pointer',
                            userSelect: 'none',
                            ...inputStyle
                          }}
            className   = {`form-control ${valid && hasValue() ? 'is-valid' : ''} ${!valid ? 'is-invalid' : ''}`}
            onClick     ={hasValue() 
                          ? (ev) => download(inputRef, ev) 
                          : (_)  => browse(inputRef)}>
            {hasValue()
              ? <div style={{display: "flex", width: "100%", alignItems: "stretch"}}>
                  <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    {`${onDownload != undefined ? '⤓ ' : ''}${innerValue.name}`}
                  </div>
                  <div style={{flex: "1 1 auto", textAlign: "right"}}>
                    <i style={{fontSize: "0.6em", opacity: "0.75", whiteSpace: "nowrap"}}>
                      {` (${formatBytes(innerValue.size)})`}
                    </i>
                  </div>
                </div>
              : inputRef.current && inputRef.current.files.length
                ? inputRef.current.files[0].name
                : '...'
            }
      </div>
      <InputGroupAddon onClick   = {hasValue() 
                                    ? () => clear(inputRef) 
                                    : () => {}
                                    }
                      style     = {{cursor: hasValue() ? 'pointer' : 'not-allowed', zIndex: "2"}}
                      addonType = "append">
            <InputGroupText
                        style={{opacity:hasValue() ? 1 : 0.5}}>
              {"x"}
            </InputGroupText>
      </InputGroupAddon>    
                  
    </VInputAddon>    
  )
}


const VInputFileRS= withValue(withValium(_VInputFileRS, 'checkbox'))


VInputFileRS.propTypes = {
  ...vPropTypes,
  onLoad: PropTypes.func,
  onDownload: PropTypes.func,
  accept: PropTypes.string,
  iconMap: PropTypes.object
}

VInputFileRS.defaultProps = {
  ...vDefaultProps,
  id: `valium-reactstrap-input-file-${instanceCount++}`,
  icon : 'file'
}

export default VInputFileRS