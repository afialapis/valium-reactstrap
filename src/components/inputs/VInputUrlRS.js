import React        from 'react'
import VInputTextRS from './VInputTextRS'

/*
https://justmarkup.com/articles/2012-12-28-input-url/
*/

const VInputUrlRS = (props) =>

  <VInputTextRS {...props}
                inputType = {"text"}/>

VInputUrlRS.propTypes = VInputTextRS.propTypes

delete VInputUrlRS.propTypes['inputType']

VInputUrlRS.defaultProps = {
  icon   : 'url',
  label  : 'URL',
  pattern: "^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9-]{0,61}[a-zA-Z0-9])?.)+[a-zA-Z]{2,6}$",
  checkValidityOnKeyUp: true
}



export default VInputUrlRS