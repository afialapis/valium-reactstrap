import PropTypes    from 'prop-types'

const VInputTypes = {
  id                  : PropTypes.string,
  name                : PropTypes.string.isRequired,
  value               : function(props, _propName, _componentName) {
      if (! ('value' in props) && ! ('defaultValue' in props)) {
          return new Error('Please provide a {value} or a {defaultValue}');
      }
  },
  defaultValue        : PropTypes.string,
  label               : PropTypes.string,
  feedback            : PropTypes.string,
  icon                : PropTypes.string,
  inline              : PropTypes.bool,
  readOnly            : PropTypes.bool,
  required            : PropTypes.bool,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  checkValidityOnKeyup: PropTypes.bool,
  onChange            : PropTypes.func,
  keepHeight          : PropTypes.bool,
  formGroupStyle      : PropTypes.object,
  inputGroupStyle     : PropTypes.object
}

export default VInputTypes