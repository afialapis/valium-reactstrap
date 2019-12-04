import React, { useState } from 'react'
import {Container, Row, Col} from 'reactstrap'
import {VFormRS, VInputTextRS, VInputEmailRS, VInputUrlRS, VInputPasswordRS, VInputTextAreaRS,
        VInputNumberRS, VInputDateRS, VInputTimeRS, VInputColorRS, 
        VInputCheckboxRS, VInputSelectRS, VInputSelectMultipleRS, VInputSelectSearchRS, VInputFileRS} from '../../src'

const VFormReactstrap = () => {


  const [props, setProps]= useState({
      keepHeight: true
  })

  const [atext, _setAtext] = useState("I won't accept a NOT for an answer")
  const [aemail, setAemail] = useState('info@afialapis.com')
  const [aurl, setAurl] = useState('www.afialapis.com')
  const [apwd, setApwd] = useState('123456')
  const [aarea, setAarea] = useState('Long text\nLong Text\nYes')
  const [anumber, setAnumber] = useState(123)
  const [adate, setAdate] = useState("2019-06-01T00:22:33.547Z")
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
    <Container>
      <h1>
        VForm Reactstrap example
      </h1>

      <Row style={{margin: "1em 0"}}>
        <span style={{marginRight: "2em"}}>Some options: </span>
        <VInputCheckboxRS
                name             = 'props_keep'
                value            = {props.keepHeight}
                onChange         = {(v) => setProps({keepHeight: v})}
                label            = {undefined}
                description      = "Keep Height"
            />          
      </Row>
      <Row>
        <VFormRS onSave  = {onSubmit} 
                onCancel= {onCancel}>
            <Row>
            <Col sm="12" md="6" lg="4">
                <VInputTextRS
                        name                = 'atext'
                        disallowedValues    = {["NOT"]}
                        defaultValue        = {atext}
                        required            = {true}
                        checkValidityOnKeyup= {true}
                        label               = 'Text'
                        {...props}
                />
                <VInputEmailRS
                        name             = 'aemail'
                        value            = {aemail}
                        required         = {false}
                        checkValidityOnKeyup= {false}
                        onChange         = {(v) => setAemail(v)}
                        {...props}
                /> 
                <VInputUrlRS
                        name             = 'aurl'
                        value            = {aurl}
                        required         = {false}
                        checkValidityOnKeyup= {true}
                        onChange         = {(v) => setAurl(v)}
                        {...props}                  
                /> 
                <VInputPasswordRS
                        name             = 'apwd'
                        value            = {apwd}
                        required         = {true}
                        checkValidityOnKeyup= {true}
                        onChange         = {(v) => setApwd(v)}
                        disallowedValues = {["1234"]}
                        {...props}
                />
                <VInputTextAreaRS
                        name             = 'aarea'
                        value            = {aarea}
                        required         = {false}
                        checkValidityOnKeyup= {true}
                        onChange         = {(v) => setAarea(v)}
                        disallowedValues = {["NO"]}
                        label            = 'Area'
                        {...props}
                />                   
            </Col>
            <Col sm="12" md="6" lg="4">                
                <VInputNumberRS
                        name             = 'anumber'
                        value            = {anumber}
                        required         = {false}
                        checkValidityOnKeyup= {true}
                        onChange         = {(v) => setAnumber(v)}
                        label            = "A Number"
                        {...props}
                /> 
                <VInputDateRS
                        name             = 'adate'
                        value            = {adate}
                        required         = {false}
                        checkValidityOnKeyup= {true}
                        onChange         = {(v) => {console.log(v); console.log(new Date(v)); setAdate(v)}}
                        label            = "A date"
                        {...props}
                /> 
                <VInputTimeRS
                        name             = 'atime'
                        value            = {atime}
                        required         = {false}
                        checkValidityOnKeyup= {true}
                        onChange         = {(v) => setAtime(v)}
                        label            = "A time"
                        {...props}
                />
                <VInputColorRS
                        name             = 'acolor'
                        value            = {acolor}
                        required         = {false}
                        checkValidityOnKeyup= {true}
                        onChange         = {(v) => setAcolor(v)}
                        label            = "A color"
                        {...props}
                />
                <VInputFileRS
                        name             = 'afile'
                        value            = {afile}
                        required         = {false}
                        onChange         = {(v) => {console.log(v); setAfile(v)}}
                        label            = 'A file'
                        {...props}
                />
            </Col>
            <Col sm="12" md="6" lg="4">
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
                        {...props}
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
                        {...props}
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
                        {...props}
                />
                <VInputCheckboxRS
                        name             = 'acheck'
                        value            = {acheck}
                        required         = {false}
                        checkValidityOnKeyup= {true}
                        onChange         = {(v) => {setAcheck(v); console.log('Set check to ' + v + ' --- ' + typeof v)}}
                        label            = "A check"
                        description      = "Some description here"
                        disallowedValues = {['false', false]}
                        {...props}
                />
            </Col>
            </Row>            
        </VFormRS>
      </Row>
    </Container>
  );
}

export default VFormReactstrap
