const getEnabledOptions = (options, allowedValues, disallowedValues) => {

  const enabledOptions= []
  options.map((opt) => {
    const optValue= opt[0] 
    const optLabel= opt[1] || optValue
    const optDisabled= opt.length>=3 ? opt[2] : false
    let enabled= ! optDisabled
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
    enabledOptions.push({
      value: optValue,
      label: optLabel,
      disabled: !enabled
    })
  })
    
  return enabledOptions
}


export {getEnabledOptions}