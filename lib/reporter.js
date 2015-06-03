/**
 * @file class Reporter
 * @author nighca<nighca@live.cn>
 */

var util = require('./util');

function Reporter(options) {
    options = options || {};

    this._options = options;
    this._results = options.results || [];
    this._rule = options.rule || null;
}

Reporter.prototype.bindRule = function (rule) {
    return new Reporter({
        results: this._results,
        rule: rule
    });
};

Reporter.prototype.report = function (item) {
    item = util.extend({
        type: 'WARN',
        pos: 0,
        code: null,
        message: '',
        rule: this._rule
    }, item);

    this._results.push(item);

    return this;
};

['info', 'warn', 'error'].forEach(function (type) {
    Reporter.prototype[type] = function (pos, code, message, rule) {
        var item = {
            type: type.toUpperCase(),
            pos: pos,
            code: code,
            message: message
        };

        if (rule) {
            item.rule = rule;
        }

        return this.report(item);
    };
});

Reporter.prototype.result = function () {
    this._results.sort(function (a, b) {
        return a.pos - b.pos;
    });

    return this._results;
};

Reporter.prototype.num = function () {
    return this._results.length;
};

module.exports = Reporter;
