import React from 'react'

import useInnerValue   from '../useInnerValue'

const withValue = (BaseComponent, transform) => {
  
  const _withValue = (props) => {

    const [innerValue, innerProps]= useInnerValue(props, transform)
    
    return (
      <BaseComponent {...props}
                    innerValue={innerValue}
                    innerProps={innerProps} />
    )
  }

  return _withValue
}


export default withValue