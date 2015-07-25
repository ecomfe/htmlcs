/**
 * @file get config
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var stripJsonComments = require('strip-json-comments');

var util = require('./util');
var fsUtil = require('./fs-util');

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
    var currPath;
    var configFile;

    // look for config file till root
    do {
        currPath = dirPath;
        configFile = getConfigFileUnder(currPath);
        dirPath = path.resolve(currPath, '../');
    }
    while (
        !configFile
        && currPath !== dirPath
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
    var homePath = fsUtil.getHomePath();
    return homePath ? getConfigFileUnder(homePath) : null;
};

/**
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
    return path.join(fsUtil.app.root, 'lib/default/htmlcsrc');
});

/**
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
