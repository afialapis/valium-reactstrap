import {useCallback} from 'react'
import {useInnerValue} from './useInnerValue'

const useValueProps = (props) => {
  const {onChange}= props
  
  const [innerValue, setInnerValue, controlled] = useInnerValue(props)

  const handleChange = useCallback((event) => {
    const value= event.target.value

    setInnerValue(value)


    if (onChange!=undefined) {
      onChange(value)
    }

  }, [setInnerValue, onChange])


  const valueProps= controlled 
    ? {value   : innerValue,
       onChange: handleChange
      } 
    : {defaultValue: innerValue}
  
  return [valueProps]
}  

export {useValueProps}