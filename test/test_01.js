import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import co from "co"
import ES6Promise from 'es6-promise'
import UUID from "node-uuid"
import assert from 'assert'


ES6Promise.polyfill()

describe('Valium Reactstrap', function() {

  this.timeout(30000)
  let container;

  before(function(){
    container = document.createElement("div")
    container.id = "react"  
    document.body.appendChild(container)
  })
  
  after(function(){
    document.body.removeChild(container)
  }) 
  
  it("should render an empty form.", co.wrap(function *(){
    const id = UUID.v4()
    const App = () => {
      return (
        <div>

        </div>
      )
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    
    //const emptyFormElement = document.getElementById(id)
    //assert.notEqual(emptyFormElement.getAttribute('class').indexOf('valium-form'), -1)
    // ReactDOM.unmountComponentAtNode(container)
  }))  

})