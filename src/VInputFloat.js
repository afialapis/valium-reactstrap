import React       from 'react'
import PropTypes   from 'prop-types'
import VInputNumber from './_VInputNumber'
import { useFloatProps } from './helpers/useNumberProps'

const VInputFloat = (props) => {

  const [inputFilter, t]= useFloatProps(props.decimalSign)

  return (
    <VInputNumber {...
        {...props,
         inputFilter,
         t
        }
      }/>
  )
 }

VInputFloat.propTypes = {
  ...VInputNumber.propTypes,
  decimals    : PropTypes.number,
  decimalSign : PropTypes.oneOf([',', '.']),
}

VInputFloat.defaultProps = {
  ...VInputNumber.defaultProps,
  icon: 'dollar',
  decimals: 2,
  decimalSign: '.'
}

export default VInputFloat
