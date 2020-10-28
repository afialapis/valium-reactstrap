import React, {useState} from 'react'
import {VInputDate, VInputUnixSecs} from '../../../src'


const getToday = (add= 0) => {
  const n= new Date()
  n.setUTCHours(0,0,0,0);
  if (add) {
    n.setDate(n.getDate() + add);
  }
  return n.toISOString()
}

const DemoInputDate = (options) => {
  const [when, setWhen]= useState(getToday(1))
  const [whon, setWhon]= useState(1603839600)

  return (
    <>
      <VInputDate
             name             = {'when'}
             value            = {when}
             onChange         = {(v) => setWhen(v)}
             disallowedValues = {[getToday()]}
             label            = {"When will you take your next Valium?"}
             description      = "Why would you wait till tomorrow"
             required         = {true}
             //checkValue       = {(v) => {console.log(`checking date ${v} against ${getToday()}`); return true}}
             {...options}
             />
      <VInputUnixSecs
             name             = {'whon'}
             value            = {whon}
             onChange         = {(v) => setWhon(v)}
             disallowedValues = {[1603753200]}
             label            = {"When will you take your next Valium?"}
             description      = "Why would you wait till tomorrow"
             required         = {true}
             {...options}
      />
      
    </>          
  )
}

export {DemoInputDate}