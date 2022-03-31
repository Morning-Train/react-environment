'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
require('react');
var PropTypes = require('prop-types');
var useEnvValue = require('../hooks/use-env-value.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

function WithEnvValue(_ref) {
  var path = _ref.path,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
      children = _ref.children;

  var _useEnvValue = useEnvValue(path, defaultValue),
      _useEnvValue2 = _slicedToArray__default["default"](_useEnvValue, 1),
      value = _useEnvValue2[0];

  if (typeof children === 'function') {
    return children(value);
  }

  throw new Error('Always pass a function as child to WithEnvValue');
}
WithEnvValue.propTypes = {
  path: PropTypes__default["default"].string.isRequired,
  children: PropTypes__default["default"].func.isRequired
};

module.exports = WithEnvValue;
//# sourceMappingURL=WithEnvValue.js.map
