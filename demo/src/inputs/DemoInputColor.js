import React, {useState} from 'react'
import {VInputColor} from '../../../src'

const DemoInputColor = ({showAddon, keepHeight}) => {
  const [color, setColor]= useState('#FF00FF')
  
  return (
      <VInputColor
              name             = {'color'}
              value            = {color}
              onChange         = {(v) => setColor(v)}
              disallowedValues = {['#000000', '#FFFFFF', '#ffffff']}
              feedback         = {'Neither black nor white'}
              label            = {"What color has your world now?"}
              description      = "Neither black nor white!"
              keepHeight       = {keepHeight}
              {... !showAddon && {icon: null}} 
              />     
  )
}

export {DemoInputColor}
