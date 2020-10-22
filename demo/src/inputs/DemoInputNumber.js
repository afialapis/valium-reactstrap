import React, {useState} from 'react'
import {VInputNumber} from '../../../src'

const DemoInputNumber = ({showAddon, keepHeight}) => {

  const [pills, setPills]= useState(2.5)
  const [weight, setWeight]= useState(105.876)
  const [size, setSize]= useState(1.44)
  
  return (
    <>
      <VInputNumber
              name        = {'pills'}
              value       = {pills}
              onChange    = {(v) => setPills(v)}
              required    = {false}
              decimals    = {1}
              step        = {2}
              checkValue  = {(v) => v>=6}
              label       = {"How many pills per dose would you like?"}
              description = {"Some >=6 integer. Decimals allowed but invalid (decimals=1)."}
              feedback    = {'Hey folk, give yourself a bit of fun!'}
              keepHeight  = {keepHeight}
              {... !showAddon && {icon: null}} 
              >
      </VInputNumber>        

      <VInputNumber
              name        = {'weight'}
              value       = {weight}
              onChange    = {(v) => setWeight(v)}
              required    = {true}
              decimals    = {3}
              step        = {1.111}
              label       = {"Hmm... sounds like too much pills. How much do you weight?"}
              description = {"Some float (max 3 decimals, decimals = 3)."}
              keepHeight  = {keepHeight}
              {... !showAddon && {icon: null}} 
              >
      </VInputNumber>                

      <VInputNumber
              name        = {'size'}
              value       = {size}
              onChange    = {(v) => setSize(v)}
              label       = {"Still not sure... Your size?"}
              description = {"Some float (max 2 decimals, native step = 0.01)."}
              step        = {0.01}
              required    = {true}
              keepHeight  = {keepHeight}
              {... !showAddon && {icon: null}} 
              >
      </VInputNumber>
    </>
  )
}

export {DemoInputNumber}
