import React, {useState} from 'react'
import {VInputCheckbox} from '../../../src'

const DemoInputCheckbox = ({showAddon, keepHeight}) => {
  const [effects, setEffects]= useState(true)

  return (
      <VInputCheckbox
             name             = {'effects'}
             value            = {effects}
             onChange         = {(v) => setEffects(v)}
             disallowedValues = {[true]}
             label            = {""}
             checkboxLabel    = "Did you notice side effects?"
             description      = ""
             keepHeight       = {keepHeight}
             {... !showAddon && {icon: null}} 
             />
  )
}

export {DemoInputCheckbox}
