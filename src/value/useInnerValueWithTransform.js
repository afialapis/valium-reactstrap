import {useState, useEffect} from 'react'
import isControlled from '../helpers/isControlled'

const useInnerValueWithTransform = (props, t) => {
  const controlled= isControlled(props)

  const {value, defaultValue}= props

  const [innerValue, setInnerValue]= useState(controlled ? t(value) : t(defaultValue))

  useEffect(() => {
    const nInnerValue= controlled ? t(value) : t(defaultValue)
    if (innerValue != nInnerValue) {
      setInnerValue(nInnerValue)
    }

  }, [innerValue, value, defaultValue, controlled, t])

  
  return [innerValue, setInnerValue, controlled]
}


export {useInnerValueWithTransform}