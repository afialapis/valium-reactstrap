import {useCallback} from 'react'
import {useInnerValue} from './useInnerValue'

const useValueProps = (props) => {
  const {onChange}= props
  
  const [innerValue, setInnerValue] = useInnerValue(props)

  const handleChange = useCallback((event) => {
    const value= event.target.value
    
    setInnerValue(value)

    if (onChange!=undefined) {
      onChange(value, event)
    }

  }, [setInnerValue, onChange])


  const valueProps= 
    {value   : innerValue || '',
     onChange: handleChange
    }
  
  return [valueProps]
}  

export {useValueProps}