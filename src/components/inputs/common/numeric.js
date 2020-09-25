const parseNumeric= (numeric, value) => 
  (value==undefined || value=='')
    ? ''
    : numeric 
      ? parseInt(value)
      : value

export default parseNumeric

