import 'react';
import { useWillPipe } from '@morningtrain/react-pipelines';
import useEnv from '../hooks/use-env.js';

function SetEnvValueOnPipe(_ref) {
  var path = _ref.path,
      value = _ref.value;
  var env = useEnv();
  useWillPipe(function (payload) {
    return new Promise(function (resolve, reject) {
      env.set(path, value);
      resolve(payload);
    });
  }, [env, path, value]);
  return null;
}

export default SetEnvValueOnPipe;
//# sourceMappingURL=SetEnvValueOnPipe.js.map
