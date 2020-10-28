import {useState, useEffect} from 'react'

const getOptionListFromArrayOfArray = (a) => {
  const optionsList= []
  a.map((opt) => {
    const optValue= opt[0] 
    const optLabel= opt[1] || optValue
    const optDisabled= opt.length>=3 ? opt[2] : false
    optionsList.push({
      value: optValue,
      label: optLabel,
      disabled: optDisabled
    })
  })
  return optionsList    
}

const getOptionListFromArrayOfObject = (a) => {
  const optionsList= []
  a.map((opt) => {
    const optValue= opt.value 
    const optLabel= opt?.label || optValue
    const optDisabled= opt?.disabled || false
    optionsList.push({
      value: optValue,
      label: optLabel,
      disabled: optDisabled
    })
  })
  return optionsList    
}

const getOptionListFromObject = (a) => {
  const optionsList= []
  Object.entries(a).map((opt) => {
    const optValue= opt[0]
    const optLabel= opt[1]
    optionsList.push({
      value: optValue,
      label: optLabel,
      disabled: false
    })
  })
  return optionsList    
}  

const isAnArray = (v) => 
  Object.prototype.toString.call( v ) === '[object Array]' 


const useEnabledOptions = (options, allowedValues, disallowedValues) => {
  const [enabledOptions, setEnabledOptions]= useState([])

  useEffect(() => {
    
    const isDisallowed = (v) => {
      if (disallowedValues) {
        if (disallowedValues.indexOf(v)>=0) {
          return true
        }
      }
      return false
    }

    const isAllowed = (v) => {
      if (allowedValues) {
        if (allowedValues.indexOf(v)>=0) {
          return true
        }
        return false
      }
      return true
    }

    let optionsList= []

    if (! isAnArray(options)) {
      if (Object.keys(options).length>0) {
        optionsList= getOptionListFromObject(options)
      }
    } else {
      if (options.length>0) {
        const first= options[0]
        if (isAnArray(first)) {
          optionsList= getOptionListFromArrayOfArray(options)
        } else {
          optionsList= getOptionListFromArrayOfObject(options)
        }
      }
    }

    const nEabledOptions = optionsList.map((opt) => {
      return {
        value   : opt.value,
        label   : opt.label,
        disabled: opt.disabled || isDisallowed(opt.value) || !isAllowed(opt.value)
      }
    })

    setEnabledOptions(nEabledOptions)

  }, [options, allowedValues, disallowedValues])
    
  return [enabledOptions]
}


export {useEnabledOptions}