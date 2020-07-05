import React, {useState, useEffect, useCallback} from 'react'
import valueOrDef   from './valueOrDef'


const useInnerValue = (value, defaultValue, onChange, onConfirm) => {
  
  const [vProps, setVProps]= useState(valueOrDef(value, defaultValue)[0])
  const [innerValue, setInnerValue]= useState(valueOrDef(value, defaultValue)[1])
  const [confirmedValue, setConfirmedValue]= useState(undefined)

  useEffect(() => {
    const [vprops, nvalue]= valueOrDef(value, defaultValue)
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
  }, [value, defaultValue])

  const handleChange = useCallback(
    (event) => {
      const value= event.target.value
      if (value!=innerValue) {
        setInnerValue(value)

        if (onChange!=undefined) {
          onChange(value)
        }
      }
    },
    [innerValue, onChange]
  )

  const handleOnFocus= useCallback(
    () => {
      setConfirmedValue(innerValue)
    },
    [innerValue]
  )

  const handleOnBlur = useCallback(
    () => {
      if (onConfirm!=undefined) {
        if (confirmedValue!=innerValue) {
          setConfirmedValue(innerValue)
          onConfirm(innerValue)
        }
      }
    },
    [innerValue, onConfirm]
  )


  return [innerValue, {...vProps, onChange: handleChange,onFocus: handleOnFocus, onBlur: handleOnBlur }]
}



export default useInnerValue