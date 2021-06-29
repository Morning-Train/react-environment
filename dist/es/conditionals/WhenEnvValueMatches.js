import { slicedToArray as _slicedToArray } from '../_virtual/_rollupPluginBabelHelpers.js';
import 'react';
import PropTypes from 'prop-types';
import useEnvValue from '../hooks/use-env-value.js';
import useShouldConditionallyRender from '../hooks/use-should-conditionally-render.js';

function WhenEnvValueMatches(_ref) {
  var name = _ref.name,
      path = _ref.path,
      matches = _ref.matches,
      _ref$negate = _ref.negate,
      negate = _ref$negate === void 0 ? false : _ref$negate,
      children = _ref.children;

  var _path = path || name;

  var _useEnvValue = useEnvValue(_path),
      _useEnvValue2 = _slicedToArray(_useEnvValue, 1),
      value = _useEnvValue2[0];

  var _useShouldConditional = useShouldConditionallyRender(value, matches, negate),
      _useShouldConditional2 = _slicedToArray(_useShouldConditional, 1),
      shouldRender = _useShouldConditional2[0];

  return shouldRender ? children : null;
}

WhenEnvValueMatches.propTypes = {
  /**
     * The env path(name). (USE PATH INSTEAD)
     */
  name: PropTypes.string,

  /**
     * The env path.
     */
  path: PropTypes.string,

  /**
     * The value to match the current parameter against.
     */
  matches: PropTypes.any,

  /**
     * Should the result be negated?
     */
  negate: PropTypes.bool
};

export default WhenEnvValueMatches;
//# sourceMappingURL=WhenEnvValueMatches.js.map
