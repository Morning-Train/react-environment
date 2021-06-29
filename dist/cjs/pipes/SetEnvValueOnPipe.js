'use strict';

require('react');
var reactPipelines = require('@morningtrain/react-pipelines');
var useEnv = require('../hooks/use-env.js');

function SetEnvValueOnPipe(_ref) {
  var path = _ref.path,
      value = _ref.value;
  var env = useEnv();
  reactPipelines.useWillPipe(function (payload) {
    return new Promise(function (resolve, reject) {
      env.set(path, value);
      resolve(payload);
    });
  }, [env, path, value]);
  return null;
}

module.exports = SetEnvValueOnPipe;
//# sourceMappingURL=SetEnvValueOnPipe.js.map
