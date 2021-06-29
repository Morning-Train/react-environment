import React from 'react';
import EnvironmentHelper from '../helpers/EnvironmentHelper.js';
import EnvContext from '../contexts/EnvContext.js';

function Environment(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? null : _ref$data,
      _ref$env = _ref.env,
      env = _ref$env === void 0 ? null : _ref$env,
      children = _ref.children;

  var _env = env || new EnvironmentHelper(data);

  return /*#__PURE__*/React.createElement(EnvContext.Provider, {
    value: _env
  }, children);
}

export default Environment;
//# sourceMappingURL=Environment.js.map
