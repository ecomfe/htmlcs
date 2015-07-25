/**
 * @file operation of rules
 * @author nighca<nighca@live.cn>
 */

var util = require('./util');

var rules = [];

/**
 * class Rule
 *
 * @constructor
 * @param {Object} rule - config info for rule
 */
var Rule = function (rule) {
    util.extend(this, rule);
};

util.extend(Rule.prototype, {

    /**
     * Target of rule: "document" / "parser".
     * @type {string}
     */
    target: 'document',

    /**
     * If rule disabled.
     * @type {boolean}
     */
    disabled: false,

    /**
     * 对parser.on的封装, 实现对rule disabled状态的控制
     *
     * @param {Parser} parser - Parser实例
     * @param {string} event - 事件名
     * @param {Function} handler - 事件触发执行函数句柄
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
     * @param {Object} cfg - cfg对象
     * @param {string=} name - 配置字段，默认为rule.name
     * @return {*} name对应的cfg信息
     */
    getCfg: function (cfg, name) {
        name = typeof name === 'undefined' ? this.name : name;
        return cfg[name];
    }
});

module.exports = {

    /**
     * Init rules.
     *
     * @return {Object} rules export
     */
    init: function () {
        var self = this;

        rules = [];

        // pre-set rules
        [
            require('./rules/asset-type'),
            require('./rules/attr-lowercase'),
            require('./rules/attr-no-duplication'),
            require('./rules/attr-value-double-quotes'),
            require('./rules/bool-attribute-value'),
            require('./rules/button-name'),
            require('./rules/button-type'),
            require('./rules/charset'),
            require('./rules/css-in-head'),
            require('./rules/doctype'),
            require('./rules/html-lang'),
            require('./rules/id-class-ad-disabled'),
            require('./rules/ie-edge'),
            require('./rules/img-alt'),
            require('./rules/img-src'),
            require('./rules/img-title'),
            require('./rules/img-width-height'),
            require('./rules/indent-char'),
            require('./rules/lowercase-class-with-hyphen'),
            require('./rules/lowercase-id-with-hyphen'),
            require('./rules/rel-stylesheet'),
            require('./rules/script-content'),
            require('./rules/script-in-tail'),
            require('./rules/spec-char-escape'),
            require('./rules/style-content'),
            require('./rules/style-disabled'),
            require('./rules/tag-pair'),
            require('./rules/tagname-lowercase'),
            require('./rules/title-required'),
            require('./rules/unique-id'),
            require('./rules/viewport')
        ].forEach(function (rule) {
            self.add(rule);
        });

        return this;
    },

    /**
     * Add a rule.
     *
     * @param {Object} rule - rule to add
     * @return {number} current rules num
     */
    add: function (rule) {
        rule = new Rule(rule);
        return rules.push(rule);
    },

    /**
     * Get list of rule for given target.
     *
     * @param {string=} target - given target ("document" / "parser")
     * @return {Array} rule list
     */
    list: function (target) {
        if (!target) {
            return rules.slice();
        }

        return rules.filter(function (rule) {
            return rule.target === target;
        });
    },

    /**
     * Do lint parser.
     *
     * @param {Parser} parser - the HTML parser, instance of htmlparser2.Parser
     * @param {Reporter} reporter - the reporter
     * @param {Object} cfg - config
     * @param {string} code - target code
     * @return {Object} rules export
     */
    lintParser: function (parser, reporter, cfg, code) {
        // rule config in comment
        parser.on('comment', function (comment) {
            var commentInfo = util.extractCommentInfo(comment);

            // if no valid info
            if (!commentInfo) {
                return;
            }

            var operation = commentInfo.operation;
            switch (operation) {
                case 'enable':
                case 'disable':
                    var targetAll = !commentInfo.content;
                    var targets = !targetAll && commentInfo.content.split(/\s*,\s*/g);

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

    /**
     * Do lint document.
     *
     * @param {Node} document - the document node
     * @param {Reporter} reporter - the reporter
     * @param {Object} cfg - config
     * @param {string} code - target code
     * @return {Object} rules export
     */
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

    /**
     * Do format document.
     *
     * @param {Node} document - the document node
     * @param {Object} cfg - config
     * @param {Object} options - options for format
     * @return {Object} rules export
     */
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
