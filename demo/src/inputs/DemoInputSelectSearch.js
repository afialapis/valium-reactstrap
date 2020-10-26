import React, {useState} from 'react'
import {VInputSelectSearch} from '../../../src'

const LIST_OPTIONS= [
  ['' , ''],
  [1, "Fascination"],
  [2, "Slowliness"],
  [3, "Happyness"],
  [4, "Life"],
  [5, "Dream"],
  [6, "Nightmare"],
]

const DemoInputSelectSearch = (options) => {
  const [aword, setAWord]= useState(1)

  return (
    <VInputSelectSearch
            name            = {'aword'}
            options         = {LIST_OPTIONS}
            value           = {aword}
            onChange        = {(v) => setAWord(v)}
            required        = {true}
            disallowedValues= {[2, 6]}
            label           = {"A word that comes to your mind"}
            description     = ""
            clearable       = {true}
            {...options} 
            />

  )
}

export {DemoInputSelectSearch}
