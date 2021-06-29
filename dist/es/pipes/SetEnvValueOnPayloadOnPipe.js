import 'react';
import { useWillPipe } from '@morningtrain/react-pipelines';
import _set from 'lodash/set';
import useEnv from '../hooks/use-env.js';

function SetEnvValueOnPayloadOnPipe(_ref) {
  var path = _ref.path,
      payloadPath = _ref.payloadPath,
      defaultValue = _ref.defaultValue;
  var env = useEnv();
  useWillPipe(function (payload) {
    return new Promise(function (resolve, reject) {
      var value = env.get(path, defaultValue);
      _set(payload, payloadPath, value);
      resolve(payload);
    });
  }, [env, path, payloadPath, defaultValue]);
  return null;
}

export default SetEnvValueOnPayloadOnPipe;
//# sourceMappingURL=SetEnvValueOnPayloadOnPipe.js.map
