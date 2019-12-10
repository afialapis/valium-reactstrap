import React       from 'react'
import VInputTextRS from './VInputTextRS'

const VInputPasswordRS = (props) =>

  <VInputTextRS {...props}
                inputType = {"password"}/>

VInputPasswordRS.propTypes = VInputTextRS.propTypes

delete VInputPasswordRS.propTypes['inputType']


VInputPasswordRS.defaultProps = {
  icon: 'password',
  label: 'Password',
  prematureValidation: true
}

export default VInputPasswordRS