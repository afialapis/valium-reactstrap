import React       from 'react'
import VInputCheckbox from './VInputCheckbox'

const VInputCheckbox2 = (props) =>

  <VInputCheckbox {...
      {...props,
        formGroupStyle: {verticalAlign: "middle"},
        inputStyle : {/*width: "calc(100% - 2.6em)",*/ minWidth: "70px",  height: "38px", border: "1px solid #c2cfd6", left: "0", paddingTop: "0.5em", paddingLeft: "3.5em"},
        checkboxLabel: undefined,
        icon: props.checkboxLabel
      }
    }/>

VInputCheckbox2.propTypes = VInputCheckbox.propTypes

VInputCheckbox2.defaultProps = {
  ...VInputCheckbox.defaultProps
}

export default VInputCheckbox2
