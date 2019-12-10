const valueOrDefaultValue= (value, defaultValue) => {
  let vprops= {}
  let nvalue= undefined
  if (defaultValue!=undefined) {
    vprops.defaultValue= defaultValue
    nvalue= defaultValue
  } else {
    if (value!=undefined) {
      vprops.value= value
      nvalue= value
    } else {
      vprops.value= ''
      nvalue= ''
    }
  }
  return [vprops, nvalue]
}

export default valueOrDefaultValue

