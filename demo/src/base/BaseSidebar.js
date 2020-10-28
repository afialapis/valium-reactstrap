import React from 'react'
import {VInputCheckbox2, VInputSelect} from '../../../src'


const BaseSidebar = ({options, resume, onChangeOption}) => {

  return (
    <aside>

      <h2>Options</h2>
      <div className="mgbottom">
        <form>

          <div>
              <VInputCheckbox2
                            name         = {'keepHeight'}
                            value        = {options.keepHeight}
                            onChange     = {(v) => onChangeOption('keepHeight', v)}
                            checkboxLabel= {'Keep Height'}
                            />
              <VInputCheckbox2
                            name         = {'showAddon'}
                            value        = {options.showAddon}
                            onChange     = {(v) => onChangeOption('showAddon', v)}
                            checkboxLabel= {'Show Addon'}
                            />
              <VInputSelect
                            name         = {'showValidity'}
                            value        = {options.showValidity}
                            onChange     = {(v) => onChangeOption('showValidity', v)}
                            icon         = {'Show Validity'}
                            options = {[
                              [0, 'Nothing'],
                              [1, 'Only feedback when invalid'],
                              [2, 'Feedback and input colors']
                            ]}
                            />                                                                
          </div>
        </form>
      </div>

      {resume.length>0
      ?  <>
            <h2>Resume</h2>

            <div className="log">
              {resume.map((s, i) => 
                <div key={`log_line_${i}`}
                    className="log_line" style={{...s.style || {}}}>{s.msg}</div>
              )}
            </div>
          </>
      : null}
    </aside>
  )
}

export {BaseSidebar}