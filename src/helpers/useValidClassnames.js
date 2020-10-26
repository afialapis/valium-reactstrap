
import {useState, useEffect} from 'react'

const useValidClassnames = (valid, showValidity, customCheck) => {
  const [cname, setCname]= useState('')


  useEffect(() => {
    let nCname= ''
    if (showValidity>=2) {
      let custom= true
      if (customCheck!=undefined) {
        custom= customCheck()
      }
      if (! custom || ! valid) {
        nCname= 'is-invalid'
      } else {
        nCname= 'is-valid'
      }
    }
    setCname(nCname)
  }, [valid, showValidity, customCheck])


  return [cname]

}

export {useValidClassnames}