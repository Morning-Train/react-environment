'use strict';

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var useEnv = require('./use-env.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function useOnEnvChange(path, callback) {
  var dependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var env = useEnv();
  React__default['default'].useEffect(function () {
    return env.observe(path, function () {
      callback(env.get(path));
    });
  }, [env, path, callback].concat(_rollupPluginBabelHelpers.toConsumableArray(dependencies)));
}

module.exports = useOnEnvChange;
//# sourceMappingURL=use-on-env-change.js.map
