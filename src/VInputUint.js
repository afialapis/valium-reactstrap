import React       from 'react'
import VInputNumber from './VInputNumber'

const VInputUint = (props) =>

  <VInputNumber {...props}/>

VInputUint.propTypes = VInputNumber.propTypes

VInputUint.defaultProps = {
  ...VInputNumber.defaultProps,
  inputFilter: 'uint'
}

export default VInputUint
