'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var Repository = require('./Repository.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var EnvironmentHelper = /*#__PURE__*/function (_Repository) {
  _inherits__default["default"](EnvironmentHelper, _Repository);

  var _super = _createSuper(EnvironmentHelper);

  function EnvironmentHelper(initialData) {
    var _this;

    _classCallCheck__default["default"](this, EnvironmentHelper);

    var __global = window || global;

    var data = initialData || __global.env || {};
    _this = _super.call(this, data); // Attach server side setEnv helper

    if (_this.server()) {
      var env = _assertThisInitialized__default["default"](_this);

      __global.setEnv = function (data) {
        env.set(data);
      };
    }

    return _this;
  }

  _createClass__default["default"](EnvironmentHelper, [{
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
exports["default"] = EnvironmentHelper;
//# sourceMappingURL=EnvironmentHelper.js.map
