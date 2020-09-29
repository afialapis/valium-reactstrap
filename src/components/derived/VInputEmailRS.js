import React       from 'react'
import VInputTextRS from '../VInputTextRS'

const VInputEmailRS = (props) =>

  <VInputTextRS {...props}
                inputType = {"email"}/>

VInputEmailRS.propTypes = VInputTextRS.propTypes

delete VInputEmailRS.propTypes['inputType']

VInputEmailRS.defaultProps = {
  ...VInputTextRS.defaultProps,
  icon: 'email',
  label: 'E-Mail'
}



export default VInputEmailRS