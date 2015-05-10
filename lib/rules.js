/**
 * @file operation of rules
 * @author nighca<nighca@live.cn>
 */

var util = require('./util');

var rules;
var doNothing = function () {};

var extractCommentInfo = function (comment) {
    var commentInfoPattern = /^[\s\n]*htmlcs-(\w+)\s+([\w\-]+(?:\,\s*[\w\-]+)*){0,1}[\s\n]*$/;
    var result = commentInfoPattern.exec(comment);

    return result ? {
        operation: result[1],
        content: result[2]
    } : null;
};

module.exports = {
    init: function () {
        var _this = this;

        rules = [];

        // pre-set rules
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
            rule = require('./rules/' + rule);
            _this.add(rule);
        });

        return this;
    },

    add: function (rule) {
        // default properties
        rule = util.extend({
            target: 'document',
            lint: doNothing
        }, rule);

        return rules.push(rule);
    },

    list: function (target) {
        if (!target) {
            return rules.slice();
        }

        return rules.filter(function (rule) {
            return rule.target === target;
        });
    },

    bindReporter: function (reporter) {
        rules.forEach(function (rule) {
            rule.reporter = reporter.bindRule(rule.name);
        });
        return this;
    },

    lintParser: function (parser, cfg) {
        // rule config in comment
        parser.on('comment', function (comment) {
            var commentInfo = extractCommentInfo(comment);

            // not a htmlcs-enable/disable comment
            if (
                !commentInfo ||
                (commentInfo.operation !== 'enable' && commentInfo.operation !== 'disable')
            ) {
                return;
            }

            var operation = commentInfo.operation;
            var targetAll = !commentInfo.content;
            var targets = !targetAll && commentInfo.content.split(/\s*\,\s*/g);

            rules.forEach(function (rule) {
                if (targetAll || targets.indexOf(rule.name) >= 0) {
                    switch (operation) {
                        case 'enable':
                            rule.reporter.enable();
                            break;
                        case 'disable':
                            rule.reporter.disable();
                            break;
                        default:
                    }
                }
            });
        });

        // lint parser
        this.list('parser').forEach(function (rule) {
            rule.lint(cfg[rule.name], parser, rule.reporter);
        });

        return this;
    },

    lintDocument: function (document, cfg) {
        // lint document
        this.list('document').forEach(function (rule) {
            try {
                rule.lint(cfg[rule.name], document, rule.reporter);
            }
            catch (e) {}
        });

        return this;
    },

    format: function (document, cfg, options) {
        // format document
        rules.forEach(function (rule) {
            if (rule.format) {
                try {
                    rule.format(cfg[rule.name], document, options);
                }
                catch (e) {}
            }
        });

        return this;
    }
};
