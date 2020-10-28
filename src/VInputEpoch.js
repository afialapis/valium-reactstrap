import React       from 'react'
import PropTypes   from 'prop-types'
import _VInputDate from './_VInputDate'
import {isoToDate} from './helpers/isoToDate'

const dateAdjustOffset = (d) => {
  const offs= d.getTimezoneOffset() * -1
  const msecs= offs * 60 * 1000
  d.setTime(d.getTime() + msecs)
  return d
}


const unixToISO = (value) => {
  if (isNaN(value))  {
    return undefined
  }

  let date = new Date(value * 1000)
  date= dateAdjustOffset(date)
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


const VInputEpoch = (props) => {
 
  return (

    <_VInputDate {...
        {...props,
          transform: {fromISO: unixFromISO,
                      toISO: unixToISO}
        }
      }/>
  )
}

VInputEpoch.propTypes = {
  ..._VInputDate.propTypes,
  value: PropTypes.number
}

VInputEpoch.defaultProps = {
  ..._VInputDate.defaultProps,
  
}

export default VInputEpoch
