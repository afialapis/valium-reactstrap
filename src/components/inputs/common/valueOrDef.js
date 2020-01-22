const numOrArrayToString = (v) => {
  if (Array.isArray(v)) {
    return v.map((a) => isNaN(a) ? '' : a.toString())
  }
  return isNaN(v) ? '' : v.toString()
}

const valueOrDefaultValue= (value, defaultValue, numeric= false) => {
  let vprops= {}
  let nvalue= undefined
  if (defaultValue!=undefined) {
    vprops.defaultValue= numeric 
                         ? numOrArrayToString(defaultValue)
                         : defaultValue
    nvalue= vprops.defaultValue
  } else {
    if (value!=undefined) {
      vprops.value= numeric 
                    ? numOrArrayToString(value)
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

