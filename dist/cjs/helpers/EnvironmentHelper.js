'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var Repository = require('./Repository.js');

var EnvironmentHelper = /*#__PURE__*/function (_Repository) {
  _rollupPluginBabelHelpers.inherits(EnvironmentHelper, _Repository);

  var _super = _rollupPluginBabelHelpers.createSuper(EnvironmentHelper);

  function EnvironmentHelper(initialData) {
    var _this;

    _rollupPluginBabelHelpers.classCallCheck(this, EnvironmentHelper);

    var __global = window || global;

    var data = initialData || __global.env || {};
    _this = _super.call(this, data); // Attach server side setEnv helper

    if (_this.server()) {
      var env = _rollupPluginBabelHelpers.assertThisInitialized(_this);

      __global.setEnv = function (data) {
        env.set(data);
      };
    }

    return _this;
  }

  _rollupPluginBabelHelpers.createClass(EnvironmentHelper, [{
    key: "server",
    value: function server() {
      return this.get('environment') === 'server';
    }
  }, {
    key: "client",
    value: function client() {
      return this.server() === false;
    }
  }, {
    key: "debug",
    value: function debug() {
      return this.get('debug', true) === true;
    }
  }, {
    key: "csrfToken",
    value: function csrfToken() {
      if (this.server()) {
        return;
      }

      var tokenMeta = document.head.querySelector('meta[name=csrf-token]');
      return tokenMeta ? tokenMeta.content : null;
    }
  }]);

  return EnvironmentHelper;
}(Repository);
var Env = new EnvironmentHelper();

exports.Env = Env;
exports.default = EnvironmentHelper;
//# sourceMappingURL=EnvironmentHelper.js.map
