'use strict';

var _typeof = require('@babel/runtime/helpers/typeof');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _get = require('lodash/get');
var _set = require('lodash/set');
var forEach = require('lodash/forEach');
var isArray = require('lodash/isArray');
var isPlainObject = require('lodash/isPlainObject');
var uniqueId = require('lodash/uniqueId');
var setWith = require('lodash/setWith');
var mergeWith = require('lodash/mergeWith');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _get__default = /*#__PURE__*/_interopDefaultLegacy(_get);
var _set__default = /*#__PURE__*/_interopDefaultLegacy(_set);
var forEach__default = /*#__PURE__*/_interopDefaultLegacy(forEach);
var isArray__default = /*#__PURE__*/_interopDefaultLegacy(isArray);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);
var uniqueId__default = /*#__PURE__*/_interopDefaultLegacy(uniqueId);
var setWith__default = /*#__PURE__*/_interopDefaultLegacy(setWith);
var mergeWith__default = /*#__PURE__*/_interopDefaultLegacy(mergeWith);

var Repository = /*#__PURE__*/function () {
  function Repository() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck__default["default"](this, Repository);

    this._observeCallbacks = {};
    this._observedPathsTree = {};
    this.data = data;
  }

  _createClass__default["default"](Repository, [{
    key: "transform",
    value: function transform(query, callback) {
      var value = this.get(query);

      if (typeof callback === "function") {
        value = callback(value);
      }

      this.set(query, value);
    }
  }, {
    key: "get",
    value: function get(query) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (arguments.length === 0) {
        return this.data;
      }

      return _get__default["default"](this.data, query, defaultValue);
    }
  }, {
    key: "set",
    value: function set(query, value) {
      // Check if query is an object
      if (_typeof__default["default"](query) === "object") {
        this.data = query;
        return this;
      }

      _set__default["default"](this.data, query, value);

      this.triggerObserveCallbacks(query);
      return this;
    }
  }, {
    key: "remove",
    value: function remove(query) {
      var parts = query.split(".");
      var key = parts.pop();
      var parentQuery = parts.join(".");
      var target = parts.length === 0 ? this.get() : this.get(parentQuery);

      if (target && _typeof__default["default"](target) === "object") {
        delete target[key];
      }

      this.triggerObserveCallbacks(query);
      return this;
    }
  }, {
    key: "has",
    value: function has(query) {
      return this.get(query) != undefined;
    }
  }, {
    key: "empty",
    value: function empty() {
      this.data = {};
      return this;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return Object.keys(this.data) === 0;
    }
  }, {
    key: "keys",
    value: function keys() {
      return Object.keys(this.data);
    }
  }, {
    key: "entries",
    value: function entries() {
      return Object.values(this.data);
    }
  }, {
    key: "each",
    value: function each(callback) {
      if (typeof callback !== "function") {
        return;
      }

      if (this.isEmpty()) {
        return;
      }

      return this.entries().map(function (entry) {
        return callback(entry);
      });
    }
  }, {
    key: "observe",
    value: function observe(path, callback) {
      var _this = this;

      if (typeof this._observeCallbacks[path] === 'undefined') {
        this._observeCallbacks[path] = {};
      }

      var uuid = uniqueId__default["default"]();

      var disposer = function disposer() {
        _this.removeObserveListener(path, callback);
      };

      this._observeCallbacks[path][uuid] = callback;
      mergeWith__default["default"](this._observedPathsTree, setWith__default["default"]({}, path, {}, Object));
      return disposer;
    }
  }, {
    key: "triggerObserveCallbacks",
    value: function triggerObserveCallbacks(path) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var promises = []; /// Trigger for direct match

        promises.push(_this2.triggerObserveCallbacksForPath(path)); /// Trigger for children

        var childObservers = _get__default["default"](_this2._observedPathsTree, path);

        if (childObservers) {
          var flattenedChildObservers = _this2._flattenObject(childObservers);

          Object.keys(flattenedChildObservers).forEach(function (pathFragment) {
            promises.push(_this2.triggerObserveCallbacksForPath(path + '.' + pathFragment));
          });
        } /// Trigger for direct parents


        var pathFragments = path.split('.');
        pathFragments.pop();

        while (pathFragments.length > 0) {
          promises.push(_this2.triggerObserveCallbacksForPath(pathFragments.join('.')));
          pathFragments.pop();
        }

        Promise.all(promises).then(function () {
          resolve();
        });
      });
    }
  }, {
    key: "triggerObserveCallbacksForPath",
    value: function triggerObserveCallbacksForPath(path) {
      var _this3 = this;

      return new Promise(function (resolve) {
        var callbacksObject = _this3._observeCallbacks[path];

        if (!callbacksObject) {
          resolve();
          return;
        }

        var keys = Object.keys(callbacksObject);

        if (typeof keys !== 'undefined' && keys.length > 0) {
          keys.forEach(function (key) {
            var trigger = function trigger() {
              if (_typeof__default["default"](_this3._observeCallbacks[path]) === 'object' && typeof _this3._observeCallbacks[path][key] === 'function') {
                _this3._observeCallbacks[path][key]();
              }

              resolve();
            };

            if (typeof requestIdleCallback === 'function') {
              requestIdleCallback(function () {
                trigger();
              });
            } else {
              trigger();
            }
          });
        }
      });
    }
  }, {
    key: "removeObserveListener",
    value: function removeObserveListener(path, callback) {
      var _this4 = this;

      if (typeof this._observeCallbacks[path] === 'undefined') {
        return;
      }

      var keys = Object.keys(this._observeCallbacks[path]);

      if (keys.length === 0) {
        return;
      }

      keys.forEach(function (key) {
        if (_this4._observeCallbacks[path][key] === callback) {
          delete _this4._observeCallbacks[path][key];
        }
      });
    }
  }, {
    key: "_flattenObject",
    value: function _flattenObject() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var result = {};

      var flatten = function flatten(collection) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        forEach__default["default"](collection, function (value, key) {
          var path = "".concat(prefix).concat(key).concat(suffix);

          if (isArray__default["default"](value)) {
            flatten(value, "".concat(path, "["), ']');
          } else if (isPlainObject__default["default"](value) && Object.keys(value).length > 0) {
            flatten(value, "".concat(path, "."));
          }

          result[path] = value;
        });
      };

      flatten(obj);
      return result;
    }
  }]);

  return Repository;
}();

module.exports = Repository;
//# sourceMappingURL=Repository.js.map
