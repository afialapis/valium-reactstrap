import React, {useState} from 'react'
import {VInputTextArea} from '../../../src'

const DemoInputTextArea = ({showAddon, keepHeight}) => {
  const [story, setStory]= useState('It started a warm Friday\'s night. I was bored...')

  return (
    <VInputTextArea 
          name        = {'story'}
          value       = {story}
          minLength   = {50}
          label       = {"Tell us more about your love story with Valium"}
          description = {`Not required. Min length 50 (currently ${story.length}).`}
          onChange    = {(v) => setStory(v)}
          keepHeight  = {keepHeight}
          {... !showAddon && {icon: null}} />
  )
}

export {DemoInputTextArea}