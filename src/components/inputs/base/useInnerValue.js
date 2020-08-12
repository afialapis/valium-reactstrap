import {useState, useEffect, useCallback} from 'react'
import parseNumeric from '../common/numeric'

const uvl = (v) => 
  v===undefined
    ? ''
    : v

const checkControlledValue = (props) => {
  if (Object.keys(props).indexOf('defaultValue')>=0) {
    return [props.defaultValue, {defaultValue: uvl(props.defaultValue)}]
  }
  return [props.value, {value: uvl(props.value)}]
}

const getTransformedValue = (func, value) => {
  if (func!==undefined) {
    return func(value)
  }
  return value

}


const useInnerValue = (props, transform) => {

  const [nInnerValue, nVProps]= checkControlledValue(props)

  const tInnerValue = getTransformedValue(transform?.from, nInnerValue)

  const [innerValue, setInnerValue]= useState(tInnerValue)

  const [vProps, setVProps]= useState(nVProps)
  
  const [confirmedValue, setConfirmedValue]= useState(undefined)

  useEffect(() => {
    const [nInnerValue, nVProps]= checkControlledValue(props)
    const tInnerValue = getTransformedValue(transform?.from, nInnerValue)

    if (nVProps!=vProps) {
      setVProps(nVProps)
    }
    if (tInnerValue!=innerValue) {
      setInnerValue(tInnerValue)
      setConfirmedValue(tInnerValue)
    }
    /*return () => {
      console.log(`useEffect - unmount  ${confirmedValue} -- ${innerValue}`)
      if (onConfirm!=undefined && confirmedValue!=innerValue) {
        onConfirm(innerValue)
      }
    }*/
  }, [props])

  const handleChange = useCallback(
    (event) => {
      const value= event.target.value
      if (value!=innerValue) {
        //setInnerValue(value)
        getTransformedValue(transform?.from, value)

        if (props.onChange!=undefined) {
          //console.log(`onChange ${getTransformedValue(transform?.to, value)} ${typeof getTransformedValue(transform?.to, value)}`)
          //props.onChange(value)
          props.onChange(parseNumeric(props.numeric, getTransformedValue(transform?.to, value)))
        }
      }
    },
    [innerValue, props.onChange]
  )

  const handleOnFocus= useCallback(
    () => {
      setConfirmedValue(innerValue)
    },
    [innerValue]
  )

  const handleOnBlur = useCallback(
    () => {
      if (props.onConfirm!=undefined) {
        if (confirmedValue!=innerValue) {
          setConfirmedValue(innerValue)
          //console.log(`onConfirm ${innerValue} ${typeof innerValue}`)
          //console.log(`onConfirm ${getTransformedValue(transform?.to, innerValue)} ${typeof getTransformedValue(transform?.to, innerValue)}`)
          //props.onConfirm(innerValue)
          props.onConfirm(parseNumeric(props.numeric, getTransformedValue(transform?.to, innerValue)))
        }
      }
    },
    [innerValue, props.onConfirm]
  )


  return [innerValue, {...vProps, onChange: handleChange,onFocus: handleOnFocus, onBlur: handleOnBlur }]
}



export default useInnerValue