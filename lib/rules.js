/**
 * @file operation of rules
 * @author nighca<nighca@live.cn>
 */

var util = require('./util');

var rules = [];

var extractCommentInfo = function (comment) {
    var commentInfoPattern = /^[\s\n]*htmlcs-(\w+)\s+([\w\-]+(?:\,\s*[\w\-]+)*){0,1}[\s\n]*$/;
    var result = commentInfoPattern.exec(comment);

    return result ? {
        operation: result[1],
        content: result[2]
    } : null;
};

/**
 * Rule 基类
 *
 * @constructor
 * @param {Object} rule rule配置信息
 */
var Rule = function (rule) {
    util.extend(this, rule);
};

util.extend(Rule.prototype, {

    target: 'document',

    disabled: false,

    /**
     * 对parser.on的封装, 实现对rule disabled状态的控制
     *
     * @param {Parser} parser Parser实例
     * @param {string} event 事件名
     * @param {Function} handler 事件触发执行函数句柄
     */
    register: function (parser, event, handler) {
        var rule = this;

        parser.on(event, function () {
            if (!rule.disabled) {
                handler.apply(this, arguments);
            }
        });
    }
});

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
        rule = new Rule(rule);
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

            // if not a htmlcs-enable/disable comment
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
                            rule.disabled = false;
                            break;
                        case 'disable':
                            rule.disabled = true;
                            break;
                        default:
                    }
                }
            });
        });

        // lint parser
        this.list('parser').forEach(function (rule) {
            rule.lint(cfg[rule.name], rule.register.bind(rule, parser), rule.reporter);
        });

        return this;
    },

    lintDocument: function (document, cfg) {
        // lint document
        this.list('document').forEach(function (rule) {
            if (rule.disabled) {
                return;
            }

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
