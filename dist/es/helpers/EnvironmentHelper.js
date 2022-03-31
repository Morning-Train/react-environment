import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import Repository from './Repository.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var EnvironmentHelper = /*#__PURE__*/function (_Repository) {
  _inherits(EnvironmentHelper, _Repository);

  var _super = _createSuper(EnvironmentHelper);

  function EnvironmentHelper(initialData) {
    var _this;

    _classCallCheck(this, EnvironmentHelper);

    var __global = window || global;

    var data = initialData || __global.env || {};
    _this = _super.call(this, data); // Attach server side setEnv helper

    if (_this.server()) {
      var env = _assertThisInitialized(_this);

      __global.setEnv = function (data) {
        env.set(data);
      };
    }

    return _this;
  }

  _createClass(EnvironmentHelper, [{
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

export { Env, EnvironmentHelper as default };
//# sourceMappingURL=EnvironmentHelper.js.map
