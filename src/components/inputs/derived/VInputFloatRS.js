import React       from 'react'
import VInputNumberRS from '../VInputNumberRS'

const VInputFloatRS = (props) =>

  <VInputNumberRS {...props}/>

VInputFloatRS.propTypes = VInputNumberRS.propTypes

VInputFloatRS.defaultProps = {
  ...VInputNumberRS.defaultProps,
  inputFilter: value => /^-?\d*[.,]?\d*$/.test(value)
}

export default VInputFloatRS
