const parseNumeric= (numeric, value) => 
  numeric 
    ? value!='' ? parseInt(value) : undefined
    : value

export default parseNumeric

