/**
 * @file operation of rules
 * @author nighca<nighca@live.cn>
 */

var util = require('./util');

var rules = [];

/**
 * 获取注释中的配置信息
 *
 * @param {string} comment 注释内容
 * @return {Object|null} 配置信息
 */
var extractCommentInfo = function (comment) {
    // htmlcs-disable img-alt, attr-value-double-quotes
    var ablePattern = /^[\s\n]*htmlcs-(\w+)\s+([\w\-]+(?:\,\s*[\w\-]+)*){0,1}[\s\n]*$/;
    // htmlcs "img-alt": false
    var configPattern = /^[\s\n]*htmlcs\s([\s\S]*)$/;

    var result;

    if (ablePattern.test(comment)) {
        result = ablePattern.exec(comment);

        return {
            operation: result[1],
            content: result[2]
        };
    }

    if (configPattern.test(comment)) {
        result = configPattern.exec(comment);

        try {
            result = (new Function('return {' + result[1] + '}'))();
            return {
                operation: 'config',
                content: result
            };
        }
        catch (e) {}
    }

    return null;
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
    },

    /**
     * 获取cfg信息
     *
     * @param {Object} cfg cfg对象
     * @param {?string} name 配置字段，默认为rule.name
     * @return {*} name对应的cfg信息
     */
    getCfg: function (cfg, name) {
        name = typeof name === 'undefined' ? this.name : name;
        return cfg[name];
    }
});

module.exports = {
    init: function () {
        var self = this;

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
            'indent-char',
            'lowercase-class-with-hyphen',
            'lowercase-id-with-hyphen',
            'rel-stylesheet',
            'script-content',
            'script-in-tail',
            'spec-char-escape',
            'style-content',
            'style-disabled',
            'tag-pair',
            'tagname-lowercase',
            'title-required',
            'unique-id',
            'viewport'
        ].forEach(function (rule) {
            rule = require('./rules/' + rule);
            self.add(rule);
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

    lintParser: function (parser, reporter, cfg, code) {
        // rule config in comment
        parser.on('comment', function (comment) {
            var commentInfo = extractCommentInfo(comment);

            // if no valid info
            if (!commentInfo) {
                return;
            }

            var operation = commentInfo.operation;
            switch (operation) {
                case 'enable':
                case 'disable':
                    var targetAll = !commentInfo.content;
                    var targets = !targetAll && commentInfo.content.split(/\s*\,\s*/g);

                    rules.forEach(function (rule) {
                        if (targetAll || targets.indexOf(rule.name) >= 0) {
                            rule.disabled = operation === 'disable';
                        }
                    });
                    break;
                case 'config':
                    util.extend(cfg, commentInfo.content);
                default:
            }
        });

        // lint parser
        this.list('parser').forEach(function (rule) {
            rule.lint(
                rule.getCfg.bind(rule, cfg),
                rule.register.bind(rule, parser),
                reporter.bindRule(rule.name),
                code
            );
        });

        return this;
    },

    lintDocument: function (document, reporter, cfg, code) {
        // lint document
        this.list('document').forEach(function (rule) {
            if (rule.disabled) {
                return;
            }

            try {
                rule.lint(
                    rule.getCfg.bind(rule, cfg),
                    document,
                    reporter.bindRule(rule.name),
                    code
                );
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
                    rule.format(
                        rule.getCfg.bind(rule, cfg),
                        document,
                        options
                    );
                }
                catch (e) {}
            }
        });

        return this;
    }
};
