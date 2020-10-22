import React       from 'react'
import VInputNumber from './VInputNumber'

const VInputInt = (props) =>

  <VInputNumber {...props}/>

VInputInt.propTypes = VInputNumber.propTypes

VInputInt.defaultProps = {
  ...VInputNumber.defaultProps,
  inputFilter: 'int'
}

export default VInputInt
