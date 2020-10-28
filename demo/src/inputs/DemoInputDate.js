import React, {useState} from 'react'
import {VInputDate, VInputUnixSecs} from '../../../src'

const dateAdjustOffset = (d) => {
  const offs= d.getTimezoneOffset() * -1
  const msecs= offs * 60 * 1000
  d.setTime(d.getTime() + msecs)
  return d
}




const getTodayUnix = (add= 0) => {
  const n= new Date()
  n.setUTCHours(0,0,0,0);
  if (add) {
    n.setDate(n.getDate() + add);
  }
  return n.getTime() / 1000
}


const getTodayISO = (add= 0) => {
  const n= new Date()
  n.setUTCHours(0,0,0,0);
  if (add) {
    n.setDate(n.getDate() + add);
  }
  return n.toISOString()
}

const DemoInputDate = (options) => {
  const [when, setWhen]= useState(getTodayISO(1))
  const [whon, setWhon]= useState(getTodayUnix(1))

  return (
    <>
      <VInputDate
             name             = {'when'}
             value            = {when}
             onChange         = {(v) => setWhen(v)}
             disallowedValues = {[getTodayISO()]}
             label            = {"When will you take your next Valium?"}
             description      = "Why would you wait till tomorrow"
             required         = {true}
             {...options}
             />
      <VInputUnixSecs
             name             = {'whon'}
             value            = {whon}
             onChange         = {(v) => setWhon(v)}
             disallowedValues = {[getTodayUnix()]}
             label            = {"When will you take your next Valium?"}
             description      = "Why would you wait till tomorrow"
             required         = {true}
             {...options}
      />
      
    </>          
  )
}

export {DemoInputDate}