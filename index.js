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
    'attr-lowercase',
    'attr-no-duplication',
    'attr-value-double-quotes',
    'bool-attribute-value',
    'button-name',
    'button-type',
    'charset',
    'css-in-head',
    'doctype',
    'html-lang',
    'id-class-ad-disabled',
    'ie-edge',
    'img-alt',
    'img-src',
    'img-title',
    'img-width-height',
    'lowercase-class-with-hyphen',
    'lowercase-id-with-hyphen',
    'rel-stylesheet',
    'script-in-tail',
    'space-tab-mixed-disabled',
    'spec-char-escape',
    'style-disabled',
    'tag-pair',
    'tagname-lowercase',
    'title-required',
    'unique-id',
    'viewport'
].forEach(function (rule) {
    rule = require('./lib/rules/' + rule);
    addRule(rule);
});

// gen a position method with given content
var getPosition = function (content) {
    var start = 0;
    var line = 0;
    var col = 0;

    // the position method
    // items should be passed with pos-low-to-high
    return function (item) {
        var index = item.pos;

        for (; start < index; start++) {
            switch (content[start]) {

                case '\n':
                    col = 0;
                    line++;
                    break;

                default:
                    col++;

            }
        }

        item.line = line + 1;
        item.col = col + 1;
    };
};

// separate rules into parser-linters & document-linters ( depends on lint target )
var separateLinters = function (rules) {
    var linters = {
        parserLinters: [],
        docLinters: []
    };

    rules.forEach(function (rule) {
        if (!rule.lint) {
            return;
        }

        if (rule.target === 'parser') {
            linters.parserLinters.push(rule);
        }
        else {
            linters.docLinters.push(rule);
        }
    });

    return linters;
};

// hint code
var hint = function (code, cfg) {
    // max error num
    var maxError = cfg['max-error'];
    delete cfg['max-error'];

    var linters = separateLinters(rules);
    var reporter = new Reporter();
    var parser = parse.getParser();

    // parser-linters
    linters.parserLinters.forEach(function (rule) {
        rule.lint(cfg[rule.name], parser, reporter.bindRule(rule.name));
    });

    // do parse
    var document = parse(code, parser);

    // document-linters
    linters.docLinters.every(function (rule) {
        try {
            rule.lint(cfg[rule.name], document, reporter.setRule(rule.name));
        }
        catch (e) {}
        // num control
        return !(maxError && reporter.num() >= maxError);
    });

    var result = reporter.result();

    // num control
    if (maxError) {
        result = result.slice(0, maxError);
    }

    // do position ( pos -> line & col )
    result.forEach(getPosition(code));

    return result;
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

// format code
var format = function (code, cfg) {
    var document = parse(code);

    // format options
    var options = util.extend({
        'indent-size': 4,
        'indent-char': 'space',
        'max-char': 120,
        'formatter': otherFormatters
    }, cfg['format']);

    // do format one by one
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

// format file
var formatFile = function (filePath, options) {
    options = options || {
        encoding: 'utf-8'
    };

    var cnt = fs.readFileSync(filePath, options);
    var cfg = config.load(filePath);

    return format(cnt, cfg);
};

module.exports = {
    addRule: addRule,
    hint: hint,
    hintFile: hintFile,
    format: format,
    formatFile: formatFile
};
