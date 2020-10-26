import {useState, useEffect} from 'react'
import isControlled from '../helpers/isControlled'

const useInnerValue = (props) => {
  const controlled= isControlled(props)

  const {value, defaultValue}= props

  const [innerValue, setInnerValue]= useState(controlled ? value : defaultValue)

  useEffect(() => {
    
    const nInnerValue= controlled ? value : defaultValue

    if (innerValue != nInnerValue) {
      setInnerValue(nInnerValue)
    }

  }, [innerValue, value, defaultValue, controlled])

  
  return [innerValue, setInnerValue, controlled]
}


export {useInnerValue}