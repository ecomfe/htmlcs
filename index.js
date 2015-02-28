/**
 * @file main file
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');

var util = require('./lib/util');
var parse = require('./lib/parse');
var Reporter = require('./lib/reporter');
var config = require('./lib/config');
var otherFormatters = require('./lib/other-formatter');

var htmlGenner = require('html-code-gen');

// rules
var rules = [];

// method to add rule
var addRule = function (rule) {
    rules.push(rule);
};

// pre-set rules based on [here](http://gitlab.baidu.com/fe/spec/blob/master/html.md)
[
    'asset-type',
    'bool-attribute-value',
    'button-name',
    'button-type',
    'charset',
    'css-in-head',
    'doctype',
    'html-lang',
    'ie-edge',
    'img-alt',
    'img-src',
    'img-title',
    'img-width-height',
    'lowercase-class-with-hyphen',
    'lowercase-id-with-hyphen',
    'rel-stylesheet',
    'script-in-tail',
    'title-required',
    'unique-id',
    'viewport'
].forEach(function (rule) {
    rule = require('./lib/rules/' + rule);
    addRule(rule);
});

// hint document
var hintDocument = function (document, cfg) {
    var reporter = new Reporter();

    // max error num
    var maxError = cfg['max-error'];
    delete cfg['max-error'];

    rules.every(function (rule) {
        reporter.setRule(rule.name);
        try {
            rule.lint(cfg[rule.name], document, reporter);
        }
        catch (e) {}

        return !(maxError && reporter.num() >= maxError);
    });

    var result = reporter.result();
    return maxError ? result.slice(0, maxError) : result;
};

// hint code
var hintCode = function (code, cfg) {
    var document = parse(code);
    
    return hintDocument(document, cfg);
};

// hint file
var hintFile = function (filePath, options) {
    options = options || {
        encoding: 'utf-8'
    };

    var cnt = fs.readFileSync(filePath, options);
    var cfg = config.load(filePath);

    return hintCode(cnt, cfg);
};

// format document
var formatDocument = function (document, cfg) {
    // format options
    var options = util.extend({
        'indent-size': 4,
        'indent-char': 'space',
        'max-char': 120,
        'formatter': otherFormatters
    }, cfg['format']);

    rules.forEach(function (rule) {
        if (rule.format) {
            try {
                rule.format(cfg[rule.name], document, options)
            }
            catch (e) {}
        }
    });

    return htmlGenner.print(document, options);
};

// format code
var formatCode = function (code, cfg) {
    var document = parse(code);

    return formatDocument(document, cfg);
};

// format file
var formatFile = function (filePath, options) {
    options = options || {
        encoding: 'utf-8'
    };

    var cnt = fs.readFileSync(filePath, options);
    var cfg = config.load(filePath);

    return formatCode(cnt, cfg);
};

module.exports = {
    addRule: addRule,
    hint: hintCode,
    hintFile: hintFile,
    format: formatCode,
    formatFile: formatFile
};
