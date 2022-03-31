'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
require('react');
var PropTypes = require('prop-types');
var useEnvValue = require('../hooks/use-env-value.js');
var useShouldConditionallyRender = require('../hooks/use-should-conditionally-render.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

function WhenEnvValueMatches(_ref) {
  var name = _ref.name,
      path = _ref.path,
      matches = _ref.matches,
      _ref$negate = _ref.negate,
      negate = _ref$negate === void 0 ? false : _ref$negate,
      children = _ref.children;

  var _path = path || name;

  var _useEnvValue = useEnvValue(_path),
      _useEnvValue2 = _slicedToArray__default["default"](_useEnvValue, 1),
      value = _useEnvValue2[0];

  var _useShouldConditional = useShouldConditionallyRender(value, matches, negate),
      _useShouldConditional2 = _slicedToArray__default["default"](_useShouldConditional, 1),
      shouldRender = _useShouldConditional2[0];

  return shouldRender ? children : null;
}

WhenEnvValueMatches.propTypes = {
  /**
     * The env path(name). (USE PATH INSTEAD)
     */
  name: PropTypes__default["default"].string,

  /**
     * The env path.
     */
  path: PropTypes__default["default"].string,

  /**
     * The value to match the current parameter against.
     */
  matches: PropTypes__default["default"].any,

  /**
     * Should the result be negated?
     */
  negate: PropTypes__default["default"].bool
};

module.exports = WhenEnvValueMatches;
//# sourceMappingURL=WhenEnvValueMatches.js.map
