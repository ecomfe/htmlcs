/**
 * @file helpers for cli operation
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var walk = require('walk');
var yargs = require('yargs');
var config = require('../config');

var dealError = function (msg) {
    console.log('Error:');
    console.log('  ' + msg + '\n');
    yargs.showHelp();
    process.exit(1);
};

var readFile = function (filePath) {
    return fs.readFileSync(filePath, {encoding: 'utf-8'});
};

var loadSpecifiedConfig = function (configFilePath) {
    try {
        return config.parse(readFile(configFilePath));
    }
    catch (e) {
        dealError('Load config (' + configFilePath + ') failed: ' + e.message);
    }
};

var getTargetFiles = function (targets) {
    return targets.reduce(function (files, target) {
        var stat = fs.statSync(target);

        if (stat.isFile()) {
            files.push(target);
            return files;
        }

        if (stat.isDirectory()) {
            walk.walkSync(target, {
                listeners: {
                    file: function (root, fileStat, next) {
                        var filePath = path.join(root, fileStat.name);

                        // filter with suffix (.html)
                        if (filePath.slice(-5) === '.html') {
                            files.push(filePath);
                        }
                        next();
                    }
                }
            });
            return files;
        }
    }, []);
};

module.exports = {
    dealError: dealError,
    readFile: readFile,
    loadSpecifiedConfig: loadSpecifiedConfig,
    getTargetFiles: getTargetFiles
};
