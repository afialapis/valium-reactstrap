import React            from 'react'
import PropTypes        from 'prop-types'
import {VForm}          from 'valium'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Button }       from 'reactstrap'


const VFormRSButtons = ({onSave, onCancel, colors, icons, labels, disabled}) => 
  <div className="sform-reactstrap-buttons">
    {onCancel!=undefined
      ? <Button color   = {colors ? colors[0] : 'secondary'}
                onClick = {(ev) => onCancel(ev)}>
          <FontAwesomeIcon icon  = {icons ? icons[0] : 'ban'}/>
          {labels ? labels[0] : 'Cancelar'}
        </Button>
      : null
    }
    {onSave!=undefined
      ? <Button color   = {colors ? colors[1] : 'primary'}
              onClick = {(ev) => onSave(ev)}
              disabled= {disabled != undefined ? disabled : false}>
          <FontAwesomeIcon icon  = {icons ? icons[1] : 'save'}/>
          {labels ? labels[1] : 'Guardar'}
        </Button>
      : null
    }
  </div>  


const VFormRS = ({children, className, onSave, onCancel, colors, icons, labels}) => 
   <VForm className    = {className || "sform-reactstrap"}
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
  children     : PropTypes.arrayOf(PropTypes.object),
  colors       : PropTypes.arrayOf(PropTypes.string),
  icons        : PropTypes.arrayOf(PropTypes.string),
  labels       : PropTypes.arrayOf(PropTypes.string),
  onSave       : PropTypes.func,
  onCancel     : PropTypes.func,
}


export default VFormRS