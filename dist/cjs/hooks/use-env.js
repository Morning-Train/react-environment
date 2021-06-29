'use strict';

var React = require('react');
var EnvironmentHelper = require('../helpers/EnvironmentHelper.js');
var EnvContext = require('../contexts/EnvContext.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function useEnv() {
  var env = React__default['default'].useContext(EnvContext);

  if (env) {
    return env;
  }

  return new EnvironmentHelper['default']();
}

module.exports = useEnv;
//# sourceMappingURL=use-env.js.map
