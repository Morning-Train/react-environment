'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var useEnv = require('./use-env.js');
var clone = require('lodash/clone');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var clone__default = /*#__PURE__*/_interopDefaultLegacy(clone);

function useEnvValue(path) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var env = useEnv();
  var defaultValueRef = React__default["default"].useRef(defaultValue);
  defaultValue = defaultValueRef.current;

  var _React$useState = React__default["default"].useState(env.get(path, defaultValue)),
      _React$useState2 = _slicedToArray__default["default"](_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  React__default["default"].useEffect(function () {
    var disposer = env.observe(path, function () {
      setValue(clone__default["default"](env.get(path, defaultValue)));
    });
    setValue(clone__default["default"](env.get(path, defaultValue)));
    return disposer;
  }, [env, path, defaultValue]);
  React__default["default"].useEffect(function () {
    setValue(clone__default["default"](env.get(path, defaultValue)));
  }, []);

  function setValueOverride(newValue) {
    var valueInEnv = env.get(path);

    if (valueInEnv !== newValue) {
      env.set(path, newValue);
    }
  }

  return [value, setValueOverride];
}

module.exports = useEnvValue;
//# sourceMappingURL=use-env-value.js.map
