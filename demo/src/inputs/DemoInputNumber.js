import React, {useState} from 'react'
import {VInputFloat, VInputInt, VInputUInt, VInputFloatSum} from '../../../src'

const DemoInputNumber = (options) => {

  const [pills, setPills]= useState(2.5)
  const [weight, setWeight]= useState(105)
  const [size, setSize]= useState(1.44)
  const [km, setKm]= useState([0.1000, 1.453])

  return (
    <>
      <VInputUInt
              name        = {'pills'}
              value       = {pills}
              onChange    = {(v) => setPills(v)}
              required    = {false}
              step        = {2}
              checkValue  = {(v) => v>=6}
              label       = {"How many pills per dose would you like?"}
              description = {"Some >=6 unsigned integer (step = 2)."}
              feedback    = {'Hey folk, give yourself a bit of fun!'}
              {...options}
              >
      </VInputUInt>        

      <VInputInt
              name        = {'weight'}
              value       = {weight}
              onChange    = {(v) => setWeight(v)}
              required    = {true}
              label       = {"Hmm... sounds like too much pills. How much do you weight?"}
              description = {"Some int (step = 1, default). Greater than zero."}
              checkValue  = {(v) => v>0}
              {...options}
              >
      </VInputInt>                

      <VInputFloat
              name        = {'size'}
              value       = {size}
              onChange    = {(v) => setSize(v)}
              label       = {"Still not sure... Your size?"}
              description = {"Some float (max 2 decimals, step = 0.01, greater than zero)."}
              step        = {0.01}
              decimalSign = {','}
              required    = {true}
              checkValue  = {(v) => v>0}
              {...options}
              >
      </VInputFloat>

      <VInputFloatSum
              name        = {'km'}
              value       = {km}
              onChange    = {(v) => setKm(v)}
              label       = {"You are not a sporty guy, right? How far did your last walks took?"}
              description = {"Some float (max 2 decimals, step = 0.01)."}
              step        = {0.01}
              decimalSign = {','}
              required    = {true}
              {...options}
              >
      </VInputFloatSum>      
    </>
  )
}

export {DemoInputNumber}
