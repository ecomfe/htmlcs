/**
 * @file main file
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');

var util = require('./lib/util');
var parse = require('./lib/parse');
var rules = require('./lib/rules');
var Reporter = require('./lib/reporter');
var config = require('./lib/config');
var otherFormatters = require('./lib/other-formatter');

var htmlGenner = require('html-code-gen');

/**
 * The report item.
 *
 * @typedef {Object} Report
 * @property {string} type - typeof the message, one of "info", "warn", "error"
 * @property {number} line - line number of the report
 * @property {number} col - col number of the report
 * @property {string} code - code of the report
 * @property {string} message - message of the report
 * @property {string} rule - name of the report's rule
 */

/**
 * Do hint with given code & config.
 *
 * @param {string} code - given code
 * @param {Object} cfg - given config
 * @return {Report[]} the hint result, list of reports
 */
var hint = function (code, cfg) {
    // get rid of \r
    code = code.replace(/\r\n?/g, '\n');

    // max error num
    var maxError = cfg['max-error'];
    delete cfg['max-error'];

    // init rules
    rules.init();

    // reporter
    var reporter = new Reporter();

    // get & lint parser
    var parser = parse.getParser();
    rules.lintParser(parser, reporter, cfg, code);

    // parse & lint document
    var document = parse(code, parser);
    rules.lintDocument(document, reporter, cfg, code);

    // get result
    var result = reporter.result();
    // num control
    if (maxError) {
        result = result.slice(0, maxError);
    }

    // do position ( pos -> line & col )
    var position = util.getPosition(code);
    result.forEach(function (item) {
        util.extend(item, position(item.pos));
    });

    return result;
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
    var cfg = config.load(filePath);

    return hint(cnt, cfg);
};

/**
 * Do format with given code & config.
 *
 * @param {string} code - given code
 * @param {Object} cfg - given config
 * @return {string} the formatted code
 */
var format = function (code, cfg) {
    var document = parse(code);

    // format options
    var options = util.extend({
        'indent-size': 4,
        'indent-char': 'space',
        'max-char': 120,
        'formatter': otherFormatters
    }, cfg.format);

    // init rules
    rules.init();

    rules.format(document, cfg, options);

    return htmlGenner.print(document, options);
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
    var cfg = config.load(filePath);

    return format(cnt, cfg);
};

module.exports = {
    addRule: rules.add.bind(rules),
    hint: hint,
    hintFile: hintFile,
    format: format,
    formatFile: formatFile
};
