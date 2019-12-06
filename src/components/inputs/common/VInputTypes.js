import PropTypes    from 'prop-types'

const VInputTypes = {
  formUpdate          : PropTypes.func.isRequired,
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
  icon                : PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  inline              : PropTypes.bool,
  readOnly            : PropTypes.bool,
  required            : PropTypes.bool,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  checkValidityOnKeyUp: PropTypes.bool,
  onChange            : PropTypes.func,
  keepHeight          : PropTypes.bool,
  formGroupStyle      : PropTypes.object,
  inputGroupStyle     : PropTypes.object
}

export default VInputTypes