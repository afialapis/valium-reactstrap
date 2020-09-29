import React       from 'react'
import VInputNumberRS from '../VInputNumberRS'

const VInputIntRS = (props) =>

  <VInputNumberRS {...props}/>

VInputIntRS.propTypes = VInputNumberRS.propTypes

VInputIntRS.defaultProps = {
  ...VInputNumberRS.defaultProps,
  inputFilter: 'int'
}

export default VInputIntRS
