import { slicedToArray as _slicedToArray } from '../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';

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

  var _React$useState = React.useState(checkIfShouldRender(value, match) !== negate),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      shouldRender = _React$useState2[0],
      setShouldRender = _React$useState2[1];

  React.useEffect(function () {
    var nextShouldRender = checkIfShouldRender(value, match) !== negate;

    if (nextShouldRender !== shouldRender) {
      setShouldRender(nextShouldRender);
    }
  }, [shouldRender, value, match, negate]);
  return [shouldRender, setShouldRender];
}

export default useShouldConditionallyRender;
//# sourceMappingURL=use-should-conditionally-render.js.map
