
const FLT_FLOAT_EN= /^-?\d*[.]?\d*$/
const FLT_FLOAT_ES= /^-?\d*[,]?\d*$/

const countDecimals = (f) => {
  try {
    const s= parseFloat(f).toString()
    if (s.indexOf('e-')>0) {
      return parseInt(s.split('-')[1])
    }
    return f.toString().split('.')[1].length
  } catch(e) {
    return 0
  }
}

const useFloatProps = (decimalSign) => {
  const inputFilter= 
    decimalSign==','
      ? FLT_FLOAT_ES
      : FLT_FLOAT_EN

  const checkFloat = (s) => {
    let n= s.replace(',', '.')
    if (isNaN(n)) {
      return false
    }
    return true
  }

  const toFloat = (s) => {
    if (! checkFloat(s)) {
      return undefined
    }
    return parseFloat(s.replace(',', '.'))
  }

  const fromFloat = (f) => {
    if (isNaN(f)) {
      return ''
    } 
    const s= parseFloat(f)
            .toString() 
            .replace('.', decimalSign)

    return s
  }

  const t= {
    from: fromFloat, 
    to: toFloat, 
    check: checkFloat
  }

  return [inputFilter, t]
}

const useFloatSumProps = (decimalSign) => {
  const inputFilter= 
    decimalSign==','
      ? FLT_FLOAT_ES
      : FLT_FLOAT_EN

  const checkFloatList = (l) => {
    let valid= true
    for (const s of l) {
      let n= s.toString().replace(',', '.')
      if (isNaN(n)) {
        valid= false
        break
      }
    }
    return valid
  }

  const toFloatList = (l) => {
    if (! checkFloatList(l)) {
      return undefined
    }
    return l.map((s) => parseFloat(s.toString().replace(',', '.')))
  }
  
  const sumFloatList = (l) => {
    const fls= l.map((s) => parseFloat(s.toString().replace(',', '.')))
                .filter((f) => ! isNaN(f))
    const sum= fls.reduce((a,b) => a+b, 0) 
    return sum
  }

  const fromFloatList = (l) => {
    const fromFloat = (f) => {
      if (isNaN(f)) {
        return ''
      } 
      const s= parseFloat(f)
              .toString() 
              .replace('.', decimalSign)

      return s
    }
    return l.map((f) => fromFloat(f))
  }

  const t= {
    from: fromFloatList,
    to: toFloatList, 
    check: checkFloatList,
    sum: sumFloatList

  }

  return [inputFilter, t]
}

const useIntProps = (unsigned= false) => {
  const inputFilter= 
  unsigned
      ? 'uint'
      : 'int'


  const checkInt = (s) => {
    let n= s.replace(',', '.')
    if (isNaN(n)) {
      return false
    }
    return true
  }
  
  
  const toInt = (s) => {
    if (isNaN(s)) {
      return undefined
    }
    return parseInt(s)
  }
  
  const fromInt = (f) => {
    if (isNaN(f)) {
      return ''
    } 
    const s= parseInt(f).toString() 
    return s
  }
      
  const t= {
    from: fromInt, 
    to: toInt, 
    check: checkInt
  }

  return [inputFilter, t]
}

export {countDecimals, useFloatProps, useFloatSumProps, useIntProps}