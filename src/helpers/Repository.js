import get from 'lodash/get';
import set from 'lodash/set';
import forEach from "lodash/forEach"
import isArray from "lodash/isArray"
import isPlainObject from "lodash/isPlainObject"
import uniqueId from "lodash/uniqueId"
import setWith from 'lodash/setWith'
import mergeWith from 'lodash/mergeWith'

export default class Repository {

    constructor(data = {}) {
        this.data = data;
    }

    transform(query, callback) {

        let value = this.get(query);

        if(typeof callback === "function") {
            value = callback(value);
        }

        this.set(query, value);
    }

    get(query, defaultValue = null) {
        if (arguments.length === 0) {
            return this.data;
        }

        return get(this.data, query, defaultValue);
    }

    set(query, value) {
        // Check if query is an object
        if (typeof query === "object") {
            this.data = query;
            return this;
        }

        set(this.data, query, value);

        this.triggerObserveCallbacks(query);

        return this;
    }

    remove(query) {
        let parts = query.split(".");
        let key = parts.pop();
        let parentQuery = parts.join(".");
        let target = parts.length === 0 ? this.get() : this.get(parentQuery);

        if (target && (typeof target === "object")) {
            delete target[key];
        }

        this.triggerObserveCallbacks(query);

        return this;
    }

    has(query) {
        return this.get(query) != undefined;
    }

    empty() {
        this.data = {};
        return this;
    }

    isEmpty() {
        return Object.keys(this.data) === 0;
    }

    keys() {
        return Object.keys(this.data);
    }

    entries() {
        return Object.values(this.data);
    }

    each(callback) {

        if(typeof(callback) !== "function") {
            return;
        }

        if(this.isEmpty()) {
            return;
        }

        return this.entries().map(entry => callback(entry));
    }

    _observeCallbacks = {};
    _observedPathsTree = {};

    observe(path, callback) {
        if (typeof this._observeCallbacks[path] === 'undefined') {
            this._observeCallbacks[path] = {};
        }

        const uuid = uniqueId()

        const disposer = () => {
            this.removeObserveListener(path, callback);
        }

        this._observeCallbacks[path][uuid] = callback;

        mergeWith(
          this._observedPathsTree,
          setWith({}, path, {}, Object)
        )

        return disposer;
    }

    triggerObserveCallbacks(path) {
        return new Promise(resolve => {

            const promises = []

            /// Trigger for direct match
            promises.push(
              this.triggerObserveCallbacksForPath(path)
            )

            /// Trigger for children
            const childObservers = get(this._observedPathsTree, path)
            if(childObservers) {
                const flattenedChildObservers = this._flattenObject(childObservers)
                Object.keys(flattenedChildObservers).forEach(pathFragment => {
                    promises.push(
                      this.triggerObserveCallbacksForPath(path + '.' + pathFragment)
                    )
                })
            }

            /// Trigger for direct parents
            const pathFragments = path.split('.')
            pathFragments.pop()

            while(pathFragments.length > 0) {
                promises.push(
                  this.triggerObserveCallbacksForPath(pathFragments.join('.'))
                )
                pathFragments.pop()
            }

            Promise.all(promises).then(() => {
                resolve()
            })
        })
    }

    triggerObserveCallbacksForPath(path) {
        return new Promise(resolve => {

            const callbacksObject = this._observeCallbacks[path];

            if(!callbacksObject) {
                resolve()
                return
            }

            const keys = Object.keys(callbacksObject)

            if (typeof keys !== 'undefined' && keys.length > 0) {
                keys.forEach(key => {

                    const trigger = () => {

                        if(typeof this._observeCallbacks[path] === 'object' && typeof this._observeCallbacks[path][key] === 'function') {
                            this._observeCallbacks[path][key]()
                        }

                        resolve()
                    }

                    if(typeof requestIdleCallback === 'function') {
                        requestIdleCallback(() => {
                            trigger();
                        })
                    } else {
                        trigger();
                    }
                })
            }

        })

    }

    removeObserveListener(path, callback) {

        if(typeof this._observeCallbacks[path] === 'undefined') {
            return;
        }

        const keys = Object.keys(this._observeCallbacks[path])

        if(keys.length === 0) {
            return;
        }

        keys.forEach((key) => {
            if (this._observeCallbacks[path][key] === callback) {
                delete this._observeCallbacks[path][key];
            }
        });
    }

    _flattenObject(obj = {}) {
        const result = {};

        const flatten = (collection, prefix = '', suffix = '') => {
            forEach(collection, (value, key) => {
                const path = `${prefix}${key}${suffix}`;

                if (isArray(value)) {
                    flatten(value, `${path}[`, ']');
                } else if (isPlainObject(value) && Object.keys(value).length > 0) {
                    flatten(value, `${path}.`);
                }

                result[path] = value;
            });
        };

        flatten(obj);

        return result;
    }

}
