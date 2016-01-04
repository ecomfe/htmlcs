/**
 * @file get config
 * @author nighca<nighca@live.cn>
 */

var path = require('path');
var Manis = require('manis');
var stripJSONComments = require('strip-json-comments');

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
 * Parse given config text content.
 *
 * @param {string} text - given config text content
 * @return {?Object} the config content
 */
var parseConfig = function (text) {
    var yaml = require('js-yaml');
    return yaml.safeLoad(stripJSONComments(text));
};

/**
 * Load config for given file.
 *
 * @param {string} filePath - path of given file
 * @param {boolean=} refresh - if skips cache
 * @return {?Object} the config content
 */
var loadConfig = util.cachable(function (filePath, refresh) {
    var options = {
        orphan: true,
        loader: parseConfig
    };

    var manis = new Manis(CONFIG_FILENAME, options);
    manis.setDefault(path.join(fsUtil.app.root, 'lib/default/htmlcsrc'), options);
    manis.setUserConfig();

    return manis.from(filePath);
});

module.exports = {
    fileName: CONFIG_FILENAME,
    parse: parseConfig,
    load: loadConfig
};
