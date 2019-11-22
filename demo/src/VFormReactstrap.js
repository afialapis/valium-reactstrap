import React, { useState } from 'react';
import {VFormRS, VInputTextRS, VInputEmailRS, VInputUrlRS, VInputPasswordRS, VInputTextAreaRS,
        VInputNumberRS, VInputDateRS, VInputTimeRS, VInputColorRS, 
        VInputCheckboxRS, VInputSelectRS, VInputSelectMultipleRS, VInputSelectSearchRS, VInputFileRS} from '../../src'

const VFormReactstrap = () => {

  const [atext, _setAtext] = useState('some uncontrolled component')
  const [btext, setBtext] = useState('some controlled component')
  const [aemail, setAemail] = useState('mail@mail.com')
  const [aurl, setAurl] = useState('www.guguel')
  const [apwd, setApwd] = useState('123456')
  const [aarea, setAarea] = useState('Long text\nLong Text\nYes')
  const [anumber, setAnumber] = useState(123)
  const [adate, setAdate] = useState('12/12/2019')
  const [atime, setAtime] = useState('11:45')
  const [acolor, setAcolor] = useState('#F5F5F5')
  const [acheck, setAcheck] = useState(false)
  const [aselect, setAselect] = useState(1)
  const [aselectmu, _setAselectmu] = useState([])
  const [asearch, setAsearch] = useState('3')
  const [afile, setAfile] = useState([])
  

  const onCancel = ev => {
    console.log('Cancelling...')
    console.log(ev)
  }
  

  const onSubmit = ev => {
    console.log('Submitting...')
    console.log(ev)
  }
  

  return (
    <div>
        <VFormRS onSave  = {onSubmit} 
                 onCancel= {onCancel}>
                  <VInputTextRS
                      name             = 'atext'
                      disallowedValues = {["NO"]}
                      defaultValue     = {atext}
                      required         = {true}
                      checkValidityOnKeyup= {true}
                      label            = 'Uncontrolled'
                  />
                  <VInputTextRS
                      name             = 'btext'
                      disallowedValues = {["NO"]}
                      value            = {btext}
                      required         = {false}
                      checkValidityOnKeyup= {true}
                      onChange         = {(v) => setBtext(v)}
                      label            = 'Controlled'
                  />
                  <VInputEmailRS
                      name             = 'aemail'
                      value            = {aemail}
                      required         = {false}
                      checkValidityOnKeyup= {false}
                      onChange         = {(v) => setAemail(v)}
                  /> 
                  <VInputUrlRS
                      name             = 'aurl'
                      value            = {aurl}
                      required         = {false}
                      checkValidityOnKeyup= {true}
                      onChange         = {(v) => setAurl(v)}                  
                  /> 
                  <VInputPasswordRS
                      name             = 'apwd'
                      value            = {apwd}
                      required         = {true}
                      checkValidityOnKeyup= {true}
                      onChange         = {(v) => setApwd(v)}
                      disallowedValues = {["1234"]}
                  />     
                  <VInputTextAreaRS
                      name             = 'aarea'
                      value            = {aarea}
                      required         = {false}
                      checkValidityOnKeyup= {true}
                      onChange         = {(v) => setAarea(v)}
                      disallowedValues = {["NO"]}
                  />                  
                  <VInputNumberRS
                      name             = 'anumber'
                      value            = {anumber}
                      required         = {false}
                      checkValidityOnKeyup= {true}
                      onChange         = {(v) => setAnumber(v)}
                      label            = "A Number"
                  /> 
                  <VInputDateRS
                      name             = 'adate'
                      value            = {adate}
                      required         = {false}
                      checkValidityOnKeyup= {true}
                      onChange         = {(v) => {console.log(v); setAdate(v)}}
                      label            = "A date"
                  /> 
                  <VInputTimeRS
                      name             = 'atime'
                      value            = {atime}
                      required         = {false}
                      checkValidityOnKeyup= {true}
                      onChange         = {(v) => setAtime(v)}
                      label            = "A time"
                  />
                  <VInputColorRS
                      name             = 'acolor'
                      value            = {acolor}
                      required         = {false}
                      checkValidityOnKeyup= {true}
                      onChange         = {(v) => setAcolor(v)}
                      label            = "A color"
                  /> 
                  <VInputCheckboxRS
                      name             = 'acheck'
                      value            = {acheck}
                      required         = {false}
                      checkValidityOnKeyup= {true}
                      onChange         = {(v) => {setAcheck(v); console.log('Set check to ' + v)}}
                      label            = "A check"
                  /> 
                  <VInputSelectRS
                      name             = 'aselect'
                      value            = {aselect}
                      required         = {false}
                      onChange         = {(v) => {setAselect(parseInt(v)); console.log('Set select to ' + v)}}
                      label            = "A select"
                      options          = {{
                          1: 'One',
                          2: 'Two',
                          3: 'Three',
                          4: 'Four',
                          5: 'Five'
                      }}
                      disallowedValues = {[2]}
                      allowedValues = {[1, 2, 5]}
                  /> 
                  <VInputSelectMultipleRS
                      name             = 'aselectmu'
                      value            = {aselectmu}
                      required         = {false}
                      onChange         = {(v) => {
                          
                          const vi= parseInt(v)
                          if (! isNaN(vi)) {
                            const dx= aselectmu.indexOf(vi)
                            if (dx>=0) {
                                aselectmu.splice(dx, 1)
                            } else {
                                aselectmu.push(vi)
                            }
                          }

                          console.log('MULTI CHANGE ' + v + ' ---- ' + aselectmu)
                      }}
                      label            = "A multiple select"
                      options          = {{
                          1: 'One',
                          2: 'Two',
                          3: 'Three',
                          4: 'Four',
                          5: 'Five'
                      }}
                      disallowedValues = {[[2]]}
                      allowedValues = {[[],[1, 2, 5]]}
                  />
                  <VInputSelectSearchRS
                      name             = 'asearch'
                      value            = {asearch}
                      required         = {false}
                      onChange         = {(v) => {setAsearch(parseInt(v)); console.log('Set select to ' + v)}}
                      label            = "A searchable select"
                      options          = {{
                          '1': 'One',
                          '2': 'Two',
                          '3': 'Three',
                          '4': 'Four',
                          '5': 'Five'
                      }}
                      disallowedValues = {['2']}
                      allowedValues = {['1', '2', '5']}
                  /> 

                  <button onClick={() => setAsearch('2')}>
                      Set to invalid
                  </button>

                  <button onClick={() => setAsearch('1')}>
                      Set to valid
                  </button>                  
                  
                  <VInputFileRS
                      name             = 'afile'
                      value            = {afile}
                      required         = {false}
                      onChange         = {(v) => {console.log(v); setAfile(v)}}
                      label            = 'A file'
                  />     
             
                      
        </VFormRS>      
    </div>
  );
}

export default VFormReactstrap
