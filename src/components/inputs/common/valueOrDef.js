const valueOrDefaultValue= (value, defaultValue, transform= undefined) => {
  let vprops= {}
  let nvalue= undefined
  if (defaultValue!=undefined) {
    vprops.defaultValue= transform!=undefined 
                         ? transform(defaultValue)
                         : defaultValue
    nvalue= vprops.defaultValue
  } else {
    if (value!=undefined) {
      vprops.value= transform!=undefined 
                    ? transform(value)
                    : value
      nvalue= vprops.value
    } else {
      vprops.value= ''
      nvalue= ''
    }
  }
  return [vprops, nvalue]
}

export default valueOrDefaultValue

