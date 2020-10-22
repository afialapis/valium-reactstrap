import React from 'react'
import {VInputFile} from '../../../src'

const DemoInputFile = ({showAddon, keepHeight}) => {

  return (
      <VInputFile
             name        = {'id_card'}
             required    = {true}
             label       = {"Upload a copy of your ID Card, authorities must know you"}
             description = ""
             keepHeight  = {keepHeight}
             {... !showAddon && {icon: null}} />   
  )
}

export {DemoInputFile}
