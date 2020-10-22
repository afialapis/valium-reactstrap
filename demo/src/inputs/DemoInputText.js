import React, {useState} from 'react'
import {VInputText} from '../../../src'

const DemoInputText = ({showAddon, keepHeight}) => {
  const [name, setName]= useState('John Not Doe')
  const [age, _setAge]= useState('33') 
  const [words, setWords]= useState('another dimension man!')

  return (
    <>
      <VInputText
              name                = 'name'
              value               = {name}
              onChange            = {(v) => setName(v)}
              required            = {true}
              disallowedValues    = {["John Doe"]}
              inputFilter         = "latin"
              label               = {"Your name here"}
              description         = {"Controlled. Required. 'John Doe' is disallowed. Latin chars."}
              keepHeight          = {keepHeight}
              {... !showAddon && {icon: null}}                  
      />

      <VInputText
              name        = 'age'
              defaultValue= {age}
              required    = {true}
              checkValue  = {(v) => !isNaN(v) && parseInt(v)>=18}
              inputFilter = "int"
              label       = {"Your age here"}
              description = {"Uncontrolled. Required. Some >18 integer (through inputFilter)"}
              keepHeight  = {keepHeight}
              {... !showAddon && {icon: null}}                  
      />

      <VInputText
              name         = 'words'
              value        = {words}
              onChange     = {(v) => setWords(v)}
              maxLength    = {20}
              label        = {"Your experience with Valium in two words"}
              description  = {`Controlled. Not required. Max length 20 (currently ${words.length})`}
              keepHeight   = {keepHeight}
              {... !showAddon && {icon: null}}                  
      />
    </>
  )
}

export {DemoInputText}
