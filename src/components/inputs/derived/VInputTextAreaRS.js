import React       from 'react'
import VInputTextRS from '../VInputTextRS'

const VInputTextAreaRS = (props) =>

  <VInputTextRS {...props}
                inputType = {"textarea"}/>

VInputTextAreaRS.propTypes = VInputTextRS.propTypes

delete VInputTextAreaRS.propTypes['inputType']

VInputTextAreaRS.defaultProps = {
  ...VInputTextRS.defaultProps,
  icon: 'text'
}



export default VInputTextAreaRS