import React       from 'react'
import VInputTextRS from './VInputTextRS'

const VInputEmailRS = (props) =>

  <VInputTextRS {...props}
                inputType = {"email"}/>

VInputEmailRS.propTypes = VInputTextRS.propTypes

delete VInputEmailRS.propTypes['inputType']

VInputEmailRS.defaultProps = {
  icon: 'email',
  label: 'E-Mail',
  prematureValidation: true
}



export default VInputEmailRS