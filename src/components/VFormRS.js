import React, {useState, useEffect, useRef} from 'react'
import PropTypes         from 'prop-types'
import {useForm}         from 'valium'
import VIcon             from './icons'
import { Button }        from 'reactstrap'


const VFormRSButtons = ({onSave, onCancel, colors, icons, labels, autoDisable, disabled, valid, readElements}) => {
  const [isSaving, setIsSaving]= useState(false)
  const isMounted= useRef(undefined)

  const isDisabled= autoDisable
    ? !valid
    : (
      typeof disabled=="function"
        ? disabled(valid, readElements)
        : disabled
    )
  
  useEffect(() => {
    isMounted.current= true

    return () => {
      isMounted.current= false
    }
  }, [])
  
  const handleSave = (ev) => {
    setIsSaving(true)

    const result= onSave(ev)
    if (result == Promise.resolve(result)) {
      result.then((_) => {
        if (isMounted.current) {
          setIsSaving(false)
        }
      })
    } else {
      setIsSaving(false)
    }
    
  }

  return (
    <div className="valium-reactstrap-buttons">
      {onCancel!=undefined
        ? <Button color   = {colors ? colors[0] : 'secondary'}
                  onClick = {(ev) => onCancel(ev)}>
            <VIcon icon  = {icons[0]}/>
            {labels ? labels[0] : 'Cancelar'}
          </Button>
        : null
      }
      {onSave!=undefined
        ? <Button color  = {colors ? colors[1] : 'primary'}
                onClick  = {(ev) => handleSave(ev)}
                disabled = {isSaving || isDisabled}>
            <VIcon icon  = {icons[1]}/>
            {labels ? labels[1] : 'Guardar'}
          </Button>
        : null
      }
    </div> 
  )
}


const VFormRS = ({children, className, onSave, onCancel, colors, icons, labels, autoDisable, disabled, renderButtons, inline}) => {
  const [formRef, valid, readElements] = useForm()

  return (
    <form  ref          = {formRef}
            className    = {`valium-reactstrap ${className!=undefined ? className : ''} ${inline==true ? 'inline' : ''}`}>
      <>
        {children}
        {renderButtons==undefined
         ? <VFormRSButtons  onSave     = {onSave!=undefined ? (ev) => onSave(ev, valid, readElements) : undefined}
                            onCancel   = {onCancel!=undefined ? (ev) => onCancel(ev, valid, readElements) : undefined}
                            colors     = {colors}
                            icons      = {icons}
                            labels     = {labels}
                            autoDisable= {autoDisable}
                            disabled   = {disabled}
                            valid      = {valid}
                            readElements= {readElements}/>
         : null}
      </>
    </form>
  )
}

VFormRS.propTypes = {
  className    : PropTypes.string,
  colors       : PropTypes.arrayOf(PropTypes.string),
  icons        : PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func])),
  labels       : PropTypes.arrayOf(PropTypes.string),
  onSave       : PropTypes.func,
  onCancel     : PropTypes.func,
  autoDisable  : PropTypes.bool,
  disabled     : PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  renderButtons: PropTypes.func,
  inline       : PropTypes.bool
}

VFormRS.defaultProps = {
  icons      : ['ban', 'save'],
  autoDisable: true,
  inline     : false
}


export default VFormRS