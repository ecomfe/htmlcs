var fs = require('fs');
var path = require('path');
var ElementType = require('domelementtype');

// app info
var app = {
    root: path.resolve(__dirname, '../')
};

// copy properties from src to target
var extend = function (target, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            target[key] = src[key];
        }
    }
    return target;
};

// make op result-cachable
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

// get path of ~/
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

module.exports = {
    app: app,
    nodeType: ElementType,
    isElement: ElementType.isTag,
    extend: extend,
    cachable: cachable,
    getHomePath: getHomePath
};
