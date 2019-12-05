import React            from 'react'
import PropTypes        from 'prop-types'
import {VForm}          from 'valium'
import VIcon            from './icons'
import { Button }       from 'reactstrap'


const VFormRSButtons = ({onSave, onCancel, colors, icons, labels, disabled}) => 
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
      ? <Button color   = {colors ? colors[1] : 'primary'}
              onClick = {(ev) => onSave(ev)}
              disabled= {disabled != undefined ? disabled : false}>
          <VIcon icon  = {icons[1]}/>
          {labels ? labels[1] : 'Guardar'}
        </Button>
      : null
    }
  </div>  


const VFormRS = ({children, className, onSave, onCancel, colors, icons, labels}) => 
   <VForm className    = {className || "valium-reactstrap"}
          renderButtons= {({valid, _elements}) => 
            <VFormRSButtons onSave  ={onSave}
                            onCancel={onCancel}
                            colors  ={colors}
                            icons   ={icons}
                            labels  ={labels}
                            disabled={! valid}/>
          }>
      {children}
   </VForm>


VFormRS.propTypes = {
  className    : PropTypes.string,
  children     : PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  colors       : PropTypes.arrayOf(PropTypes.string),
  icons        : PropTypes.arrayOf(PropTypes.string),
  labels       : PropTypes.arrayOf(PropTypes.string),
  onSave       : PropTypes.func,
  onCancel     : PropTypes.func,
}

VFormRS.defaultProps = {
  icons : ['ban', 'save']
}


export default VFormRS