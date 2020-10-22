import React, {useState} from 'react'
import {VInputSelectSearch} from '../../../src'

const LIST_OPTIONS= [
  ['' , '---'],
  ['1', "Fascination"],
  ['2', "Slowliness"],
  ['3', "Happyness"],
  ['4', "Life"],
  ['5', "Dream"],
  ['6', "Nightmare"],
]

const DemoInputSelectSearch = ({showAddon, keepHeight}) => {
  const [experience, setExperience]= useState(undefined /*'1'*/)

  return (
    <VInputSelectSearch
            name            = {'experience'}
            options         = {LIST_OPTIONS}
            value           = {experience}
            onChange        = {(v) => setExperience(v)}
            required        = {true}
            disallowedValues= {['2', '6']}
            label           = {"A word that comes to your mind"}
            description     = ""
            clearable       = {true}
            keepHeight      = {keepHeight}
            {... !showAddon && {icon: null}} 
            />

  )
}

export {DemoInputSelectSearch}
