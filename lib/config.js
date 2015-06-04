/**
 * @file get config
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');

var stripJsonComments = require('strip-json-comments');

var util = require('./util');

var configFileName = '.htmlcsrc';

var getConfigFileUnder = function (dirPath) {
    var configFilePath = path.resolve(dirPath, configFileName);
    return fs.existsSync(configFilePath) ? configFilePath : null;
};

var getConfigFileUnderOrUp = function (dirPath) {
    var parentDirPath = path.resolve(dirPath, '../');
    var configFile = getConfigFileUnder(dirPath);

    // arrives root
    if (dirPath === parentDirPath) {
        // return result no matter file exists or not
        return configFile;
    }

    // if file doesn't exist, find in parent dir
    return configFile || getConfigFileUnderOrUp(parentDirPath);
};

var getConfigFileUnderHomePath = function () {
    var homePath = util.getHomePath();
    return homePath ? getConfigFileUnder(homePath) : null;
};

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
    return getConfigFileUnder(path.join(util.app.root, 'lib/default'));
});

var loadConfig = util.cachable(function (dirPath, refresh) {
    var configFilePath = getConfigFile(dirPath, refresh);

    var configFile = fs.readFileSync(configFilePath, {encoding: 'utf-8'});

    try {
        var cfg = JSON.parse(stripJsonComments(configFile));
    }
    catch (e) {
        throw new Error('Failed to parse config file: ' + configFilePath);
    }

    return cfg;
});

var loadFileConfig = function (filePath, refresh) {
    return util.extend({}, loadConfig(path.dirname(filePath), refresh));
};

module.exports = {
    fileName: configFileName,
    load: loadFileConfig
};
