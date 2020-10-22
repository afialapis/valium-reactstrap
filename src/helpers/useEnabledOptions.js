import {useState, useEffect} from 'react'

const useEnabledOptions = (options, allowedValues, disallowedValues) => {
  const [enabledOptions, setEnabledOptions]= useState([])
  
  useEffect(() => {
    const nOptions= []
    options.map(([optValue, optLabel, disabled]) => {
      let enabled= true
      if (disabled!=undefined) {
        enabled= !disabled
      }
      if (disallowedValues) {
        if (disallowedValues.indexOf(optValue)>=0) {
          enabled= false
        }
      }
      if (allowedValues) {
        if (allowedValues.indexOf(optValue)<0) {
          enabled= false
        }
      }
      nOptions.push({
        value: optValue,
        label: optLabel,
        disabled: !enabled
      })
    })
    setEnabledOptions(nOptions)
  }, [options, allowedValues, disallowedValues])

  return [enabledOptions]
}


export {useEnabledOptions}