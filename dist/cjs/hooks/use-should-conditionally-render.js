'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function useShouldConditionallyRender(value, match) {
  var negate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  function checkIfShouldRender(value, match) {
    if (typeof match === 'function') {
      return match(value);
    } /// If match has not been provided - we assume that we are checking for existence


    if (typeof match === 'undefined') {
      return value !== null && typeof value !== 'undefined';
    } /// Exact match check


    if (value === match) {
      return true;
    } /// String cast equality check


    if ("".concat(value) === "".concat(match)) {
      return true;
    }

    return false;
  }

  var _React$useState = React__default["default"].useState(checkIfShouldRender(value, match) !== negate),
      _React$useState2 = _slicedToArray__default["default"](_React$useState, 2),
      shouldRender = _React$useState2[0],
      setShouldRender = _React$useState2[1];

  React__default["default"].useEffect(function () {
    var nextShouldRender = checkIfShouldRender(value, match) !== negate;

    if (nextShouldRender !== shouldRender) {
      setShouldRender(nextShouldRender);
    }
  }, [shouldRender, value, match, negate]);
  return [shouldRender, setShouldRender];
}

module.exports = useShouldConditionallyRender;
//# sourceMappingURL=use-should-conditionally-render.js.map
