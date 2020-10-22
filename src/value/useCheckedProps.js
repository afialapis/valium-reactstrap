import {useCallback} from 'react'
import {useInnerValue} from './useInnerValue'

const useCheckedProps = (props) => {
  const {onChange}= props
  
  const [innerValue, setInnerValue, controlled] = useInnerValue(props)

  const handleChange = useCallback((event) => {
    const value= event.target.checked

    setInnerValue(value)

    if (onChange!=undefined) {
      onChange(value)
    }

  }, [setInnerValue, onChange])

  const valueProps= controlled 
    ? {checked   : innerValue,
       onChange: handleChange
      } 
    : {defaultChecked: innerValue}

  return [valueProps]
}  

export {useCheckedProps}