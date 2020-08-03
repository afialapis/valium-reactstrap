import React       from 'react'
import VInputNumberRS from '../VInputNumberRS'

const VInputUintRS = (props) =>

  <VInputNumberRS {...props}/>

VInputUintRS.propTypes = VInputNumberRS.propTypes

VInputUintRS.defaultProps = {
  ...VInputNumberRS.defaultProps,
  inputFilter: value => /^\d+$/.test(value)
}

export default VInputUintRS
