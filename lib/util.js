/**
 * @file util methods
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var ElementType = require('domelementtype');

/**
 * Application (htmlcs) info.
 *
 * @type {Object}
 * @property {string} root - root path of application (htmlcs) code
 */
var app = {
    root: path.resolve(__dirname, '../')
};

/**
 * Copy properties from src to target.
 *
 * @param {Object} target - target object
 * @param {?Object} src - src object
 * @return {Object} target object
 */
var extend = function (target, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            target[key] = src[key];
        }
    }
    return target;
};

/**
 * Define attributes for target object.
 *
 * @param {Object} target - target object
 * @param {Object} attributes - attributes
 * @return {Object} target object
 */
var extendAttribute = function (target, attributes) {
    for (var name in attributes) {
        if (attributes.hasOwnProperty(name)) {
            Object.defineProperty(target, name, attributes[name]);
        }
    }
    return target;
};

/**
 * Make given method result-cachable.
 *
 * @param {Function} getter - given method
 * @return {Function} result method which caches result automatically
 * @property {Function} clear - clear cache
 */
var cachable = function (getter) {
    var storage = {};

    var get = function (key, refresh) {
        storage[key] = (refresh || !(storage.hasOwnProperty(key))) ? getter(key, refresh) : storage[key];
        return storage[key];
    };

    var clear = function () {
        storage = {};
    };

    return extend(get, {clear: clear});
};

/**
 * Get path of home(~).
 *
 * @return {string} path of home
 */
var getHomePath = function () {
    var homePath = '';
    var environment = process.env;
    var paths = [
        environment.USERPROFILE,
        environment.HOME,
        environment.HOMEPATH,
        environment.HOMEDRIVE + environment.HOMEPATH
    ];

    while (paths.length) {
        homePath = paths.shift();
        if (fs.existsSync(homePath)) {
            return homePath;
        }
    }
};

/**
 * The position info.
 *
 * @typedef {Object} Position
 * @property {number} line - line number
 * @property {number} col - col number
 */

/**
 * Get position (line & col) in or a position method for given content.
 *
 * @param {string} content - given content
 * @param {number=} index - target index
 * @return {Position|Function} position method / position info
 */
var getPosition = function (content, index) {
    var start = 0;
    var line = 0;
    var col = 0;

    // the position method (index -> line & col)
    // indexes should be passed with pos-low-to-high
    var position = function (index) {
        for (; start < index; start++) {
            col++;

            if (content[start] === '\n') {
                col = 0;
                line++;
            }
        }

        return {
            line: line + 1,
            col: col + 1
        };
    };

    return arguments.length > 1 ? position(index) : position;
};

module.exports = {
    app: app,
    nodeType: ElementType,
    isElement: ElementType.isTag,
    extend: extend,
    extendAttribute: extendAttribute,
    cachable: cachable,
    getHomePath: getHomePath,
    getPosition: getPosition
};
