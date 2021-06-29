import { toConsumableArray as _toConsumableArray } from '../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import useEnv from './use-env.js';

function useOnEnvChange(path, callback) {
  var dependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var env = useEnv();
  React.useEffect(function () {
    return env.observe(path, function () {
      callback(env.get(path));
    });
  }, [env, path, callback].concat(_toConsumableArray(dependencies)));
}

export default useOnEnvChange;
//# sourceMappingURL=use-on-env-change.js.map
