/**
 * @file get config
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var stripJsonComments = require('strip-json-comments');

var util = require('./util');

/**
 * Name of the config file.
 *
 * @type {string}
 * @const
 */
var CONFIG_FILENAME = '.htmlcsrc';

/**
 * Get config file under given directory.
 *
 * @param {string} dirPath - path of given directory
 * @return {?string} path of the config file, null if not exists
 */
var getConfigFileUnder = function (dirPath) {
    var configFilePath = path.resolve(dirPath, CONFIG_FILENAME);
    return fs.existsSync(configFilePath) ? configFilePath : null;
};

/**
 * Get config file under given directory or its ancestral directories.
 *
 * @param {string} dirPath - path of given directory
 * @return {?string} path of the config file, null if not exists
 */
var getConfigFileUnderOrUp = function (dirPath) {
    var nextPath = dirPath;
    var configFile;

    // look for config file till root
    do {
        dirPath = nextPath;
        configFile = getConfigFileUnder(dirPath);
        nextPath = path.resolve(dirPath, '../');
    }
    while (
        !configFile &&
        dirPath !== nextPath
    );

    return configFile;
};

/**
 * Get config file under home directory.
 *
 * @param {string} dirPath - path of given directory
 * @return {?string} path of the config file, null if not exists
 */
var getConfigFileUnderHomePath = function () {
    var homePath = util.getHomePath();
    return homePath ? getConfigFileUnder(homePath) : null;
};

/**
 * @function getConfigFile
 * Get config file for given directory.
 * The given directory, its ancestral directories and home directory will be tried.
 *
 * @param {string} dirPath - path of given directory
 * @param {boolean=} refresh - if skips cache
 * @return {?string} path of the config file, null if not exists
 */
var getConfigFile = util.cachable(function (dirPath) {
    var configFile;

    // search config file from dir to root
    if (configFile = getConfigFileUnderOrUp(dirPath)) {
        return configFile;
    }

    // search file in home path
    if (configFile = getConfigFileUnderHomePath()) {
        return configFile;
    }

    // use default config file
    return path.join(util.app.root, 'lib/default/htmlcsrc');
});

/**
 * @function loadConfig
 * Load config for given file.
 *
 * @param {string} filePath - path of given file
 * @param {boolean=} refresh - if skips cache
 * @return {?Object} the config content
 */
var loadConfig = util.cachable(function (filePath, refresh) {
    var config = null;
    var dirPath = path.dirname(filePath);
    var configFilePath = getConfigFile(dirPath, refresh);
    var configFile = fs.readFileSync(configFilePath, {encoding: 'utf-8'});

    try {
        config = JSON.parse(stripJsonComments(configFile));
    }
    catch (e) {
        throw new Error('Failed to parse config file: ' + configFilePath);
    }

    return config;
});

module.exports = {
    fileName: CONFIG_FILENAME,
    load: loadConfig
};
