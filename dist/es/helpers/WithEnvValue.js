import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import 'react';
import PropTypes from 'prop-types';
import useEnvValue from '../hooks/use-env-value.js';

function WithEnvValue(_ref) {
  var path = _ref.path,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
      children = _ref.children;

  var _useEnvValue = useEnvValue(path, defaultValue),
      _useEnvValue2 = _slicedToArray(_useEnvValue, 1),
      value = _useEnvValue2[0];

  if (typeof children === 'function') {
    return children(value);
  }

  throw new Error('Always pass a function as child to WithEnvValue');
}
WithEnvValue.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export { WithEnvValue as default };
//# sourceMappingURL=WithEnvValue.js.map
