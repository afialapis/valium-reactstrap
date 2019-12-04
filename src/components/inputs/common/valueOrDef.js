const valueOrDefaultValue= (value, defaultValue) => {
  let vprops= {}
  let nvalue= undefined
  if (defaultValue!=undefined) {
    vprops.defaultValue= defaultValue
    nvalue= defaultValue
  } else {
    vprops.value= value
    nvalue= value
  }
  return [vprops, nvalue]
}

export default valueOrDefaultValue

