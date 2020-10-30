import {useCallback} from 'react'
import {useInnerValue} from './useInnerValue'

const useCheckedProps = (props) => {
  const {onChange}= props
  
  const [innerValue, setInnerValue] = useInnerValue(props)

  const handleChange = useCallback((event) => {
    const value= event.target.checked

    setInnerValue(value)

    if (onChange!=undefined) {
      onChange(value, event)
    }

  }, [setInnerValue, onChange])

  const valueProps= 
    {checked   : innerValue,
     onChange: handleChange
    }

  return [valueProps]
}  

export {useCheckedProps}