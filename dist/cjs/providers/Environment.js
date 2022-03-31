'use strict';

var React = require('react');
var EnvironmentHelper = require('../helpers/EnvironmentHelper.js');
var EnvContext = require('../contexts/EnvContext.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Environment(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? null : _ref$data,
      _ref$env = _ref.env,
      env = _ref$env === void 0 ? null : _ref$env,
      children = _ref.children;

  var _env = env || new EnvironmentHelper["default"](data);

  return /*#__PURE__*/React__default["default"].createElement(EnvContext.Provider, {
    value: _env
  }, children);
}

module.exports = Environment;
//# sourceMappingURL=Environment.js.map
