import React            from 'react'
import PropTypes        from 'prop-types'
import {VForm}          from 'valium'
import VIcon            from './icons'
import { Button }       from 'reactstrap'


const VFormRSButtons = ({onSave, onCancel, colors, icons, labels, autoDisable, disabled, valid, elements}) => {
  const isDisabled= autoDisable
    ? !valid
    : (
      typeof disabled=="function"
        ? disabled(valid, elements)
        : disabled
    )

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
                onClick  = {(ev) => onSave(ev)}
                disabled = {isDisabled}>
            <VIcon icon  = {icons[1]}/>
            {labels ? labels[1] : 'Guardar'}
          </Button>
        : null
      }
    </div> 
  )
}


const VFormRS = ({renderInputs, className, onSave, onCancel, colors, icons, labels, autoDisable, disabled}) => 
   <VForm className    = {className || "valium-reactstrap"}
          renderInputs = {renderInputs}
          renderButtons= {(valid, elements) => 
            <VFormRSButtons onSave     = {(ev) => onSave(ev, valid, elements)}
                            onCancel   = {onCancel!=undefined ? (ev) => onCancel(ev, valid, elements) : undefined}
                            colors     = {colors}
                            icons      = {icons}
                            labels     = {labels}
                            autoDisable= {autoDisable}
                            disabled   = {disabled}
                            valid      = {valid}
                            elements   = {elements}/>}
    />

VFormRS.propTypes = {
  className    : PropTypes.string,
  renderInputs : PropTypes.func.isRequired,
  colors       : PropTypes.arrayOf(PropTypes.string),
  icons        : PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func])),
  labels       : PropTypes.arrayOf(PropTypes.string),
  onSave       : PropTypes.func,
  onCancel     : PropTypes.func,
  autoDisable  : PropTypes.bool,
  disabled     : PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
}

VFormRS.defaultProps = {
  icons      : ['ban', 'save'],
  autoDisable: true
}


export default VFormRS