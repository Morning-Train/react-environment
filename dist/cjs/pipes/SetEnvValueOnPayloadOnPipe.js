'use strict';

require('react');
var reactPipelines = require('@morningtrain/react-pipelines');
var _set = require('lodash/set');
var useEnv = require('../hooks/use-env.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _set__default = /*#__PURE__*/_interopDefaultLegacy(_set);

function SetEnvValueOnPayloadOnPipe(_ref) {
  var path = _ref.path,
      payloadPath = _ref.payloadPath,
      defaultValue = _ref.defaultValue;
  var env = useEnv();
  reactPipelines.useWillPipe(function (payload) {
    return new Promise(function (resolve, reject) {
      var value = env.get(path, defaultValue);
      _set__default["default"](payload, payloadPath, value);
      resolve(payload);
    });
  }, [env, path, payloadPath, defaultValue]);
  return null;
}

module.exports = SetEnvValueOnPayloadOnPipe;
//# sourceMappingURL=SetEnvValueOnPayloadOnPipe.js.map
