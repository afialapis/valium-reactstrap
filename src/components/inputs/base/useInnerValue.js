import {useState, useEffect, useMemo} from 'react'
import isControlled from './isControlled'

const uvl = (v) => {
  if (v===undefined) {
    return ''
  }
  return v
}

const useInnerValue = (props, transform) => {
  const controlled= isControlled(props)
  
  const t = useMemo(() => 
    transform==undefined 
            ? (v) => v
            : (v) => transform(v)
  , [transform])

  const [innerValue, setInnerValue]= useState(controlled ? t(props.value) : t(props.defaultValue))
  const [valueProps, setValueProps]= useState(controlled ? {value: uvl(t(props.value))} 
                                                           : {defaultValue: uvl(t(props.defaultValue))})

  useEffect(() => {
    const nInnerValue= controlled ? t(props.value) : t(props.defaultValue)
    setInnerValue(nInnerValue)

    const nValueProps= controlled ? {value: uvl(t(props.value))} 
                                    : {defaultValue: uvl(t(props.defaultValue))}
    setValueProps(nValueProps)

  }, [props.value, props.defaultValue, controlled, t])


  return [innerValue, valueProps]
}


export default useInnerValue