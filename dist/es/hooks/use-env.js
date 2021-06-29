import React from 'react';
import EnvironmentHelper from '../helpers/EnvironmentHelper.js';
import EnvContext from '../contexts/EnvContext.js';

function useEnv() {
  var env = React.useContext(EnvContext);

  if (env) {
    return env;
  }

  return new EnvironmentHelper();
}

export default useEnv;
//# sourceMappingURL=use-env.js.map
