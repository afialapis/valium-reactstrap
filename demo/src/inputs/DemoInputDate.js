import React, {useState} from 'react'
import {VInputDate} from '../../../src'

const pad = (n) => 
  n.toString().padStart(2, '0')

const getToday = (add= 0) => {
  const n= new Date()
  return `${pad(n.getDate() + add)}/${pad(n.getMonth()+1)}/${n.getFullYear()}`
}

const DemoInputDate = ({showAddon, keepHeight}) => {
  const [when, setWhen]= useState(getToday(1))

  return (
      <VInputDate
             name             = {'when'}
             value            = {when}
             onChange         = {(v) => setWhen(v)}
             disallowedValues = {[getToday()]}
             label            = {"When will you take your next Valium?"}
             description      = "Why would you wait till tomorrow"
             required         = {true}
             keepHeight       = {keepHeight}
             {... !showAddon && {icon: null}} 
             />
  )
}

export {DemoInputDate}