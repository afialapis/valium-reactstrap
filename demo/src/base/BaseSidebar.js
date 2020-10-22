import React from 'react'
import {VInputCheckbox} from '../../../src'


const BaseSidebar = ({options, resume, onChangeOption}) => {


  return (
    <aside>
      {options.length>0
      ? <>
          <h2>Options</h2>
          <div className="mgbottom">
            <form>
            {options.map((option, idx) => 
              <div key={`valium-demo-sidebar-option-${idx}`} style={{padding: "0.5em"}}>
                  <VInputCheckbox 
                                name         = {option.name}
                                value        = {option.value}
                                onChange     = {(v) => onChangeOption(option.name, v)}
                                checkboxLabel= {option.label}
                                />
              </div>
            )}
            </form>
          </div>
        </>
        : null
      }
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