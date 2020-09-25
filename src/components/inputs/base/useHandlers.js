import {/*useState,*/ useCallback, useMemo} from 'react'



const useHandlers = (innerValue, props, transform) => {
  //const [isFocused, setIsFocused]= useState(false)

  const t = useMemo(() => 
    transform==undefined 
            ? (v) => v
            : (v) => transform(v)
  , [transform])


  const {onChange} = props

  const handleChange = useCallback(
    (event) => {
      const value= event.target.value
      //console.log(`useInnerValue handleChange value = ${value}, innerValue = ${innerValue}`)

      //if (value!=innerValue) {

        console.log('HANDLE CHANGE SELECT')
        console.log(event.target)
        console.log(`(${event.target.value}) (${innerValue})`)

        if (onChange!=undefined) {
          onChange(t(value))
        }
      //}
    },
    [innerValue, onChange, t]
  )

  /*
  const handleOnFocus= useCallback(
    () => {
      setIsFocused(true)
    }, []
  )

  const handleOnBlur = useCallback(
    () => {
      setIsFocused(false)
    }, []
  )
  */


  return{onChange: handleChange /*, onFocus: handleOnFocus, onBlur: handleOnBlur*/ }
}



export default useHandlers