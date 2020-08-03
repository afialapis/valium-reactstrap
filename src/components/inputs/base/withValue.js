import React from 'react'

import useInnerValue   from './useInnerValue'

const withValue = (BaseComponent, transform) => (props) => {

  const [innerValue, innerProps]= useInnerValue(props, transform)
  
  return (
    <BaseComponent {...props}
                   innerValue={innerValue}
                   innerProps={innerProps} />
  );
}


export default withValue