/**
 * @file htmlcs methods
 * @author nighca<nighca@live.cn>
 */

var htmlGenner = require('html-code-gen');

var util = require('./util');
var parse = require('./parse');
var rules = require('./rules');
var Reporter = require('./reporter');
var otherFormatters = require('./other-formatter');

/**
 * The report item.
 *
 * @typedef {Object} Report
 * @property {string} type - typeof the message, one of "info", "warn", "error"
 * @property {number} line - line number of the report
 * @property {number} column - column number of the report
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

    // do position ( pos -> line & column )
    var position = util.getPosition(code);
    result.forEach(function (item) {
        util.extend(item, position(item.pos));
    });

    return result;
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

module.exports = {
    addRule: rules.add.bind(rules),
    hint: hint,
    format: format
};
