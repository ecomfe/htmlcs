/**
 * @file main file
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');

var parse = require('./lib/parse');
var Reporter = require('./lib/reporter');
var config = require('./lib/config');

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

// hint code
var hint = function (code, cfg) {
    var document = parse(code);
    var reporter = new Reporter();

    // max error num
    var maxError = cfg['max-error'];
    delete cfg['max-error'];

    rules.every(function (rule) {
        reporter.setRule(rule.name);
        rule.lint(cfg[rule.name], document, reporter);

        return !(maxError && reporter.num() >= maxError);
    });

    var result = reporter.result();
    return maxError ? result.slice(0, maxError) : result;
};

// hint file
var hintFile = function (filePath, options) {
    options = options || {
        encoding: 'utf-8'
    };

    var cnt = fs.readFileSync(filePath, options);
    var cfg = config.load(filePath);

    return hint(cnt, cfg);
};

module.exports = {
    addRule: addRule,
    hint: hint,
    hintFile: hintFile
};
