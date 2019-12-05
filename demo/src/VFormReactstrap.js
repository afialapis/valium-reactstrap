import React, { useState } from 'react'
import {Container, Row, Col} from 'reactstrap'
import {VFormRS, VInputTextRS, VInputEmailRS, VInputUrlRS, VInputPasswordRS, VInputTextAreaRS,
        VInputNumberRS, VInputDateRS, VInputTimeRS, VInputColorRS, 
        VInputCheckboxRS, VInputSelectRS, VInputSelectMultipleRS, VInputSelectSearchRS, VInputFileRS} from '../../src'

const VFormReactstrap = () => {

  const [keepHeight, setKeepHeight]=  useState(true)
  const [showAddon, setShowAddon]=  useState(true)
  const [keyUp, setKeyUp]=  useState(false)

  const [atext, setAtext] = useState("I won't take NOT for an answer")
  const [aemail, setAemail] = useState('info@afialapis.com')
  const [aurl, setAurl] = useState('www.afialapis.com')
  const [apwd, setApwd] = useState('123456')
  const [aarea, setAarea] = useState('Long text\nLong Text\nYes')
  const [anumber, setAnumber] = useState(123)
  const [adate, setAdate] = useState("today")
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
        Valium Reactstrap demo
      </h1>

      <Row style={{margin: "1em 0"}}>
        <span style={{marginRight: "2em"}}>Some options: </span>
        <VInputCheckboxRS
                id               = 'props_keep'
                name             = 'props_keep'
                value            = {keepHeight}
                onChange         = {(v) => setKeepHeight(v)}
                label            = {undefined}
                description      = "Keep Height"
                inline           = {true}
                formGroupStyle   = {{marginRight: "2em"}}
            /> 
        <VInputCheckboxRS
                id               = 'show_addon'
                name             = 'show_addon'
                value            = {showAddon}
                onChange         = {(v) => setShowAddon(v)}
                label            = {undefined}
                description      = "Show Addons"
                inline           = {true}
                formGroupStyle   = {{marginRight: "2em"}}
            />   
        <VInputCheckboxRS
                id               = 'key_up'
                name             = 'key_up'
                value            = {keyUp}
                onChange         = {(v) => setKeyUp(v)}
                label            = {undefined}
                description      = "Validate on KeyUp"
                inline           = {true}
                formGroupStyle   = {{marginRight: "1em"}}
            /> 
        {keyUp ?
         <span style={{fontStyle: "italic", fontSize: "0.8em", marginRight: "2em"}}>
           * It only applies to some inputs
         </span>                           
         : null
        }
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
                        onChange            = {(v) => setAtext(v)}
                        required            = {true}
                        checkValidityOnKeyup= {keyUp}
                        label               = 'Text'
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                        
                />
                <VInputEmailRS
                        name                = 'aemail'
                        value               = {aemail}
                        required            = {false}
                        checkValidityOnKeyup= {keyUp}
                        onChange            = {(v) => setAemail(v)}
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                /> 
                <VInputUrlRS
                        name                = 'aurl'
                        value               = {aurl}
                        required            = {false}
                        checkValidityOnKeyup= {keyUp}
                        onChange            = {(v) => setAurl(v)}
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}                  
                /> 
                <VInputPasswordRS
                        name                = 'apwd'
                        value               = {apwd}
                        required            = {true}
                        checkValidityOnKeyup= {keyUp}
                        onChange            = {(v) => setApwd(v)}
                        disallowedValues    = {["1234"]}
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />
                <VInputTextAreaRS
                        name                = 'aarea'
                        value               = {aarea}
                        required            = {false}
                        checkValidityOnKeyup= {keyUp}
                        onChange            = {(v) => setAarea(v)}
                        disallowedValues    = {["NO"]}
                        label               = 'Area'
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />                   
            </Col>
            <Col sm="12" md="6" lg="4">                
                <VInputNumberRS
                        name                = 'anumber'
                        value               = {anumber}
                        required            = {false}
                        checkValidityOnKeyup= {keyUp}
                        onChange            = {(v) => setAnumber(v)}
                        label               = "A Number"
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                /> 
                <VInputDateRS
                        name                = 'adate'
                        value               = {adate}
                        required            = {false}
                        checkValidityOnKeyup= {keyUp}
                        onChange            = {(v) => setAdate(v)}
                        label               = "A date"
                        keepHeight          = {keepHeight}
                        disallowedValues    = {["31/12/2019"]}
                        {... !showAddon && {icon: null}}
                /> 
                <VInputTimeRS
                        name                = 'atime'
                        value               = {atime}
                        required            = {false}
                        checkValidityOnKeyup= {keyUp}
                        onChange            = {(v) => setAtime(v)}
                        label               = "A time"
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />
                <VInputColorRS
                        name                = 'acolor'
                        value               = {acolor}
                        required            = {false}
                        checkValidityOnKeyup= {keyUp}
                        disallowedValues    = {["#000000", "#ffffff"]}
                        onChange            = {(v) => setAcolor(v)}
                        label               = "A color"
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />
                <VInputFileRS
                        name                = 'afile'
                        value               = {afile}
                        required            = {false}
                        onChange            = {(v) => {console.log(v); setAfile(v)}}
                        label               = 'A file'
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
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
                        allowedValues    = {[1, 2, 5]}
                        keepHeight       = {keepHeight}
                        {... !showAddon && {icon: null}}
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
                        allowedValues    = {['1', '2', '5']}
                        keepHeight       = {keepHeight}
                        {... !showAddon && {icon: null}}
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
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />
                <VInputCheckboxRS
                        name                = 'acheck'
                        value               = {acheck}
                        required            = {false}
                        checkValidityOnKeyup= {keyUp}
                        onChange            = {(v) => setAcheck(v)}
                        label               = "A check"
                        description         = "I will not accept it unchecked"
                        disallowedValues    = {['false', false]}
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />
            </Col>
            </Row>            
        </VFormRS>
      </Row>
    </Container>
  );
}

export default VFormReactstrap
