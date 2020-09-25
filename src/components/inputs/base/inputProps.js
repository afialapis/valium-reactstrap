import PropTypes from 'prop-types'

const vPropTypes = {
  // Props for valium
  prematureValidation : PropTypes.bool,
  feedback            : PropTypes.string,  
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  doRepeat            : PropTypes.string,
  doNotRepeat         : PropTypes.string,
  decimals            : PropTypes.number,
  inputFilter         : PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(RegExp), PropTypes.string]),
  
  id                  : PropTypes.string,
  name                : PropTypes.string.isRequired,
  value               : function(props, _propName, _componentName) {
      if (! ('value' in props) && ! ('defaultValue' in props)) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  defaultValue        : PropTypes.string,
  label               : PropTypes.string,
  icon                : PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  inline              : PropTypes.bool,
  readOnly            : PropTypes.bool,
  required            : PropTypes.bool,
  onChange            : PropTypes.func,
  keepHeight          : PropTypes.bool,
  formGroupStyle      : PropTypes.object,
  inputGroupStyle     : PropTypes.object,
  inputStyle          : PropTypes.object
}

const vDefaultProps = {
  prematureValidation: true,
  keepHeight: false,
  inline: false
}

export {vPropTypes, vDefaultProps}