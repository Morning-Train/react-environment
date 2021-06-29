import { slicedToArray as _slicedToArray } from '../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import useEnv from './use-env.js';
import clone from 'lodash/clone';

function useEnvValue(path) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var env = useEnv();
  var defaultValueRef = React.useRef(defaultValue);
  defaultValue = defaultValueRef.current;

  var _React$useState = React.useState(env.get(path, defaultValue)),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  React.useEffect(function () {
    var disposer = env.observe(path, function () {
      setValue(clone(env.get(path, defaultValue)));
    });
    setValue(clone(env.get(path, defaultValue)));
    return disposer;
  }, [env, path, defaultValue]);
  React.useEffect(function () {
    setValue(clone(env.get(path, defaultValue)));
  }, []);

  function setValueOverride(newValue) {
    var valueInEnv = env.get(path);

    if (valueInEnv !== newValue) {
      env.set(path, newValue);
    }
  }

  return [value, setValueOverride];
}

export default useEnvValue;
//# sourceMappingURL=use-env-value.js.map
