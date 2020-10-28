import React       from 'react'
import PropTypes   from 'prop-types'
import _VInputDate from './_VInputDate'
import {isoToDate} from './helpers/isoToDate'

const unixToISO = (value) => {
  if (isNaN(value))  {
    return undefined
  }

  const date = new Date(value * 1000)
  return date.toISOString()
}

const unixFromISO = (value) => {
  if (! value) {
    return undefined
  }
  const date= isoToDate(value)
  const usecs= Math.floor(date.getTime()/1000)   
  return usecs
}


const VInputUnixSecs = (props) => {
 
  return (

    <_VInputDate {...
        {...props,
          transform: {fromISO: unixFromISO,
                      toISO: unixToISO}
        }
      }/>
  )
}

VInputUnixSecs.propTypes = {
  ..._VInputDate.propTypes,
  value: PropTypes.number
}

VInputUnixSecs.defaultProps = {
  ..._VInputDate.defaultProps,
  
}

export default VInputUnixSecs
