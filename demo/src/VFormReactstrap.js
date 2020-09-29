import React, { useState } from 'react'
import {Container, Row, Col, CustomInput} from 'reactstrap'
import {VForm, VInputText, VInputEmail, VInputUrl, VInputPassword, VInputTextArea,
        VInputNumber, VInputTime, VInputColor,  VInputCheckbox, VInputFile, VInputDate, 
        VInputSelect, /*VInputSelectMultiple, VInputSelectSearch, */ VInputInt, VInputUint} from '../../src'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const VFormReactstrap = () => {

  const [keepHeight, setKeepHeight]=  useState(true)
  const [showAddon, setShowAddon]=  useState(true)
  const [premature, setPremature]=  useState(true)

  //const [atext, setAtext] = useState("I won't take NOT for an answer")
  const [aemail, setAemail] = useState(undefined /*'info@afialapis.com'*/)
  const [aurl, setAurl] = useState(undefined /*'www.afialapis.com'*/)
  const [apwd, setApwd] = useState(undefined /*'123456'*/)
  const [aarea, setAarea] = useState(undefined /*'Long text\nLong Text\nYes'*/)
  //const [anumber, setAnumber] = useState(123)
  const [adate, setAdate] = useState(undefined /*"today"*/)
  const [atime, setAtime] = useState(undefined /*'11:45'*/)
  const [acolor, setAcolor] = useState(undefined /*'#F5F5F5'*/)
  const [acheck, setAcheck] = useState(undefined)
  const [aselect, setAselect] = useState(undefined /*'1'*/)
  const [aselectmu, setAselectmu] = useState([]) // useState(['1', '4'])
  const [asearch, setAsearch] = useState(undefined)
  const [afile, setAfile] = useState({name: 'custom.txt', size: 1000, type: 'txt'})
  const [afloat, setAfloat]= useState(undefined /*1.23*/)
  const [auint, setAuint]= useState(undefined/*34*/)

  const [values, setValues]= useState({
    'anumber': 123,
    'atext': "I won't take NOT for an answer"
  })

  const handleChange = (name, value) => {
    console.log(`handleChange(${name}, ${value})`)
    const nValues= {
      ...values,
      [name]: value
    }
    setValues(nValues)
  }

  const onCancel = (ev, valid, elements) => {
    console.log('Cancelling...')
    console.log(ev)
    console.log(valid)
    console.log(elements)
  }
  

  const onSubmitAsync = async (ev, valid, elements) => {
    console.log('Submitting...')
    console.log(ev)
    console.log(valid)
    console.log(elements)
    await sleep(3000)
  }
  
  const onSubmit = (ev, valid, elements) => {
    console.log('Submitting...')
    console.log(ev)
    console.log(valid)
    console.log(elements)
    sleep(3000).then(() => console.log('submitted'))
  }  

  return (
    <Container style={{marginBottom: "1em"}}>
      <h1>
        Valium Reactstrap demo
      </h1>

      <Row style={{margin: "1em 0"}}>
        <span style={{marginRight: "2em"}}>Some options: </span>
        <CustomInput
                id               = 'props_keep'
                name             = 'props_keep'
                type             = "switch"
                checked          = {keepHeight}
                onChange         = {(ev) => setKeepHeight(ev.target.checked)}
                label            = "Keep Height"
                inline           = {true}
                style            = {{marginRight: "2em"}}
            /> 
        <CustomInput
                id               = 'show_addon'
                name             = 'show_addon'
                type             = "switch"
                checked          = {showAddon}
                onChange         = {(ev) => setShowAddon(ev.target.checked)}
                label            = "Show Addons"
                inline           = {true}
                style            = {{marginRight: "2em"}}
            />   
        <CustomInput
                id               = 'key_up'
                name             = 'key_up'
                type             = "switch"
                checked          = {premature}
                onChange         = {(ev) => setPremature(ev.target.checked)}
                label            = "Premature Validation"
                inline           = {true}
                style            = {{marginRight: "1em"}}
            /> 
        {premature ?
         <span style={{fontStyle: "italic", fontSize: "0.8em", marginRight: "2em"}}>
           * It only applies to some inputs
         </span>                           
         : null
        }
      </Row>
      <Row>
        <VForm  onSave  = {onSubmit} 
                onCancel= {onCancel}
                autoDisable= {true}
                /*
                disabled = {(v,e) => {
                        console.log('CHECK DISABLED')
                        console.log(v)
                        console.log(e)
                }}
                */
                >
            <Row>
                <Col sm="12" md="6" lg="4">
                        <VInputText
                                name                = 'atext'
                                disallowedValues    = {["NOT", "not"]}
                                defaultValue        = {values.atext}
                                onChange            = {(v) => handleChange('atext', v)}
                                required            = {true}
                                prematureValidation = {premature}
                                label               = 'Text'
                        /*feedback            = {'no-feedback'}*/
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}
                                
                        />
                        <VInputEmail
                                name                = 'aemail'
                                value               = {aemail}
                                required            = {false}
                                prematureValidation = {premature}
                                onChange            = {(v) => setAemail(v)}
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}
                        /> 
                        <VInputUrl
                                name                = 'aurl'
                                value               = {aurl}
                                required            = {false}
                                prematureValidation = {premature}
                                onChange            = {(v) => setAurl(v)}
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}                  
                        /> 
                        <VInputPassword
                                name                = 'apwd'
                                value               = {apwd}
                                required            = {true}
                                prematureValidation = {premature}
                                onChange            = {(v) => setApwd(v)}
                                disallowedValues    = {["1234"]}
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}
                        />
                        <VInputTextArea
                                name                = 'aarea'
                                value               = {aarea}
                                required            = {false}
                                prematureValidation = {premature}
                                onChange            = {(v) => setAarea(v)}
                                disallowedValues    = {["NO"]}
                                label               = 'Area'
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}
                        />                   
                </Col>
                <Col sm="12" md="6" lg="4"> 
                        <VInputInt
                                name                = 'anumber'
                                required            = {false}
                                prematureValidation = {premature}
                                value               = {values.anumber}
                                onChange            = {(v) => handleChange('anumber', v)}
                                label               = "A Number"
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}
                        /> 
                        <VInputNumber
                                name                = 'afloat'
                                value               = {afloat}
                                required            = {false}
                                prematureValidation = {premature}
                                onChange            = {(v) => setAfloat(v)}
                                label               = "A Float"
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}
                        /> 
                        <VInputUint
                                name                = 'auint'
                                value               = {auint}
                                required            = {false}
                                prematureValidation = {premature}
                                onChange            = {(v) => setAuint(v)}
                                label               = "An integer"
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}
                        />  
                                                        
                        <VInputDate
                                name                = 'adate'
                                value               = {adate}
                                required            = {true}
                                prematureValidation = {premature}
                                onChange            = {(v) => setAdate(v)}
                                label               = "A date"
                                keepHeight          = {keepHeight}
                                disallowedValues    = {["31/12/2019"]}
                                {... !showAddon && {icon: null}}
                        /> 
                        <VInputTime
                                name                = 'atime'
                                value               = {atime}
                                required            = {false}
                                prematureValidation = {premature}
                                onChange            = {(v) => setAtime(v)}
                                label               = "A time"
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}
                        />
                        <VInputColor
                                name                = 'acolor'
                                value               = {acolor}
                                required            = {true}
                                prematureValidation = {premature}
                                disallowedValues    = {["#000000", "#ffffff"]}
                                onChange            = {(v) => setAcolor(v)}
                                label               = "A color"
                                keepHeight          = {keepHeight}
                                {... !showAddon && {icon: null}}
                        />
                </Col>
                <Col sm="12" md="6" lg="4">
                <VInputSelect
                        name             = 'aselect'
                        value            = {aselect}
                        required         = {true}
                        onChange         = {(v) => {console.log(`ASELECT => ${typeof v} ${v}`); setAselect(v)}}
                        label            = "A select"
                        options          = {{
                            '1': 'One',
                            '2': 'Two',
                            '3': 'Three',
                            '4': 'Four',
                            '5': 'Five'
                        }}
                        /*disallowedValues = {[2,3]}
                        allowedValues    = {[4]}*/
                        keepHeight       = {keepHeight}
                        clearable        = {true}
                        numeric          = {false}
                        {... !showAddon && {icon: null}}
                />
                {/*
                <VInputSelectSearch
                        name             = 'asearch'
                        value            = {asearch}
                        required         = {false}
                        onChange         = {(v) => {console.log(`ASEARCH => ${typeof v} ${v}`); setAsearch(v)}}
                        label            = "A searchable select"
                        options          = {{
                            1: 'One',
                            2: 'Two',
                            3: 'Three',
                            4: 'Four',
                            5: 'Five'
                        }}
                        //disallowedValues = {[2]}
                        //allowedValues    = {[1, 3, 4]}
                        keepHeight       = {keepHeight}
                        clearable        = {false}
                        numeric          = {true}
                        {... !showAddon && {icon: null}}
                />  
                <VInputSelectMultiple
                        name             = 'aselectmu'
                        value            = {aselectmu}
                        required         = {false}
                        onChange         = {(value) => setAselectmu(value)}
                        label            = "A multiple select"
                        options          = {{
                            1: 'One',
                            2: 'Two',
                            3: 'Three',
                            4: 'Four',
                            5: 'Five'
                        }}
                        disallowedValues = {[[2]]}
                        allowedValues    = {[[],[1, 3]]}
                        keepHeight       = {keepHeight}
                        numeric          = {true}
                        {... !showAddon && {icon: null}}
                />*/}
                
                <VInputCheckbox
                        name                = 'acheck'
                        value               = {acheck}
                        required            = {false}
                        prematureValidation = {premature}
                        onChange            = {(v) => {console.log('ch'+v); setAcheck(v)}}
                        label               = "A check"
                        description         = "I will not accept it unchecked"
                        disallowedValues    = {[false]}
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />
                <VInputFile
                        name                = 'afile'
                        value               = {afile}
                        required            = {true}
                        onChange            = {(v) => setAfile(v)}
                        label               = 'A file'
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />

            </Col>
            </Row>
        </VForm>
      </Row>
    </Container>
  );
}

export default VFormReactstrap
