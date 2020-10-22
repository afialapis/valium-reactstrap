import React, {useState} from 'react'
import {VInputSelect} from '../../../src'

const LIST_OPTIONS= [
  ['' , '---'],
  ['1', "It's fascinating"],
  ['2', "It's cool"],
  ['3', "Well... beh!"],
  ['4', "Take it away from me"],
]

const DemoInputSelect = ({showAddon, keepHeight}) => {
  const [experience, setExperience]= useState(undefined /*'1'*/)

  return (
    <VInputSelect
            name            = {'experience'}
            options         = {LIST_OPTIONS}
            value           = {experience}
            onChange        = {(v) => setExperience(v)}
            required        = {true}
            disallowedValues= {['3', '4']}
            allowedValues   = {['', '2']}
            label           = {"What do you think about Valium?"}
            description     = ""
            clearable       = {true}
            keepHeight      = {keepHeight}
            {... !showAddon && {icon: null}} 
            />

  )
}

export {DemoInputSelect}
