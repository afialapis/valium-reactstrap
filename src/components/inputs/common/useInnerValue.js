import React, {useState, useEffect, useCallback} from 'react'

const checkControlledValue = (props) => {
  if (Object.keys(props).indexOf('defaultValue')>=0) {
    return [props.defaultValue, {defaultValue: props.defaultValue}]
  }
  return [props.value, {value: props.value}]
}


const useInnerValue = (props) => {
  
  const [innerValue, setInnerValue]= useState(checkControlledValue(props)[0])
  const [vProps, setVProps]= useState(checkControlledValue(props)[1])
  
  const [confirmedValue, setConfirmedValue]= useState(undefined)

  useEffect(() => {
    const [nvalue, vprops]= checkControlledValue(props)
    if (vprops!=vProps) {
      setVProps(vprops)
    }
    if (nvalue!=innerValue) {
      setInnerValue(nvalue)
      setConfirmedValue(nvalue)
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
        setInnerValue(value)

        if (props.onChange!=undefined) {
          props.onChange(value)
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
          props.onConfirm(innerValue)
        }
      }
    },
    [innerValue, props.onConfirm]
  )


  return [innerValue, {...vProps, onChange: handleChange,onFocus: handleOnFocus, onBlur: handleOnBlur }]
}



export default useInnerValue