/**
 * @file main file
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');

var config = require('./lib/config');
var htmlcs = require('./lib/htmlcs');

/**
 * Try to load config info for given filePath & exit on error.
 *
 * @param {string} filePath - path of the target file
 * @return {Object} the config object
 */
var loadConfig = function (filePath) {
    try {
        return config.load(filePath);
    }
    catch (e) {
        console.error('Load config failed: ' + e.message);
        process.exit(1);
    }
};

/**
 * Do hint with given filePath & option for readFile.
 *
 * @param {string} filePath - path of the target file
 * @param {Object=} options - option for readFile
 * @return {Report[]} the hint result, list of reports
 */
var hintFile = function (filePath, options) {
    options = options || {
        encoding: 'utf-8'
    };

    var cnt = fs.readFileSync(filePath, options);
    var cfg = loadConfig(filePath);

    return htmlcs.hint(cnt, cfg);
};

/**
 * Do format with given filePath & option for readFile
 *
 * @param {string} filePath - path of the target file
 * @param {Object=} options - option for readFile
 * @return {string} the formatted code
 */
var formatFile = function (filePath, options) {
    options = options || {
        encoding: 'utf-8'
    };

    var cnt = fs.readFileSync(filePath, options);
    var cfg = loadConfig(filePath);

    return htmlcs.format(cnt, cfg);
};

module.exports = {
    addRule: htmlcs.addRule,

    hint: htmlcs.hint,
    format: htmlcs.format,

    hintFile: hintFile,
    formatFile: formatFile
};
