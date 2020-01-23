import React, { useState } from 'react'
import {Container, Row, Col, CustomInput} from 'reactstrap'
import {VForm, VInputText, VInputEmail, VInputUrl, VInputPassword, VInputTextArea,
        VInputNumber, VInputDate, VInputTime, VInputColor, 
        VInputCheckbox, VInputSelect, VInputSelectMultiple, VInputSelectSearch, VInputFile} from '../../src'

const VFormReactstrap = () => {

  const [keepHeight, setKeepHeight]=  useState(true)
  const [showAddon, setShowAddon]=  useState(true)
  const [premature, setPremature]=  useState(true)

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
  const [aselect, setAselect] = useState('1')
  const [aselectmu, setAselectmu] = useState([]) // useState(['1', '4'])
  const [asearch, setAsearch] = useState('3')
  const [afile, setAfile] = useState([])



  const onCancel = (ev, valid, elements) => {
    console.log('Cancelling...')
    console.log(ev)
    console.log(valid)
    console.log(elements)
  }
  

  const onSubmit = (ev, valid, elements) => {
    console.log('Submitting...')
    console.log(ev)
    console.log(valid)
    console.log(elements)
  }
  

  return (
    <Container>
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
                renderInputs= {(formActions) => 
            <Row>
            <Col sm="12" md="6" lg="4">
                <VInputText
                        formActions         = {formActions}
                        name                = 'atext'
                        disallowedValues    = {["NOT"]}
                        defaultValue        = {atext}
                        onChange            = {(v) => setAtext(v)}
                        required            = {true}
                        prematureValidation = {premature}
                        label               = 'Text'
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                        
                />
                <VInputEmail
                        formActions         = {formActions}
                        name                = 'aemail'
                        value               = {aemail}
                        required            = {false}
                        prematureValidation = {premature}
                        onChange            = {(v) => setAemail(v)}
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                /> 
                <VInputUrl
                        formActions         = {formActions}
                        name                = 'aurl'
                        value               = {aurl}
                        required            = {false}
                        prematureValidation = {premature}
                        onChange            = {(v) => setAurl(v)}
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}                  
                /> 
                <VInputPassword
                        formActions         = {formActions}
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
                        formActions         = {formActions}
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
                <VInputNumber
                        formActions         = {formActions}
                        name                = 'anumber'
                        value               = {anumber}
                        required            = {false}
                        prematureValidation = {premature}
                        onChange            = {(v) => setAnumber(v)}
                        label               = "A Number"
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                /> 
                <VInputDate
                        formActions         = {formActions}
                        name                = 'adate'
                        value               = {adate}
                        required            = {false}
                        prematureValidation = {premature}
                        onChange            = {(v) => setAdate(v)}
                        label               = "A date"
                        keepHeight          = {keepHeight}
                        disallowedValues    = {["31/12/2019"]}
                        {... !showAddon && {icon: null}}
                /> 
                <VInputTime
                        formActions         = {formActions}
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
                        formActions         = {formActions}
                        name                = 'acolor'
                        value               = {acolor}
                        required            = {false}
                        prematureValidation = {premature}
                        disallowedValues    = {["#000000", "#ffffff"]}
                        onChange            = {(v) => setAcolor(v)}
                        label               = "A color"
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />
                <VInputFile
                        formActions         = {formActions}
                        name                = 'afile'
                        value               = {afile}
                        required            = {false}
                        onChange            = {(v) => setAfile(v)}
                        label               = 'A file'
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />
            </Col>
            <Col sm="12" md="6" lg="4">
                <VInputSelect
                        formActions      = {formActions}
                        name             = 'aselect'
                        value            = {aselect}
                        required         = {true}
                        onChange         = {(v) => setAselect(v)}
                        label            = "A select"
                        options          = {{
                            1: 'One',
                            2: 'Two',
                            3: 'Three',
                            4: 'Four',
                            5: 'Five'
                        }}
                        disallowedValues = {[2]}
                        /*allowedValues    = {[1, 2, 5]}*/
                        keepHeight       = {keepHeight}
                        clearable        = {true}
                        numeric          = {true}
                        {... !showAddon && {icon: null}}
                />
                <button onClick={() => setAsearch(2)}>HEY HEY</button>
                <VInputSelectSearch
                        formActions      = {formActions}
                        name             = 'asearch'
                        value            = {asearch}
                        required         = {true}
                        onChange         = {(v) => setAsearch(v)}
                        label            = "A searchable select"
                        options          = {{
                            1: 'One',
                            2: 'Two',
                            3: 'Three',
                            4: 'Four',
                            5: 'Five'
                        }}
                        disallowedValues = {[2]}
                        /*allowedValues    = {['1', '2', '5']}*/
                        keepHeight       = {keepHeight}
                        clearable        = {true}
                        numeric          = {true}
                        {... !showAddon && {icon: null}}
                />  
                <VInputSelectMultiple
                        formActions      = {formActions}
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
                />
                <VInputCheckbox
                        formActions         = {formActions}
                        name                = 'acheck'
                        value               = {acheck}
                        required            = {false}
                        prematureValidation= {premature}
                        onChange            = {(v) => setAcheck(v)}
                        label               = "A check"
                        description         = "I will not accept it unchecked"
                        disallowedValues    = {['false', false]}
                        keepHeight          = {keepHeight}
                        {... !showAddon && {icon: null}}
                />
            </Col>
            </Row>
          }>
        </VForm>
      </Row>
    </Container>
  );
}

export default VFormReactstrap
