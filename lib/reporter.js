/**
 * @file class Reporter
 * @author nighca<nighca@live.cn>
 */

var util = require('./util');

function Reporter(options) {
    this._options = options;

    this._results = [];
}

Reporter.prototype.setRule = function (rule) {
    this.rule = rule;
};

Reporter.prototype.report = function (item) {
    item = util.extend({
        pos: item.elem ? item.elem.startIndex : 0,
        rule: this.rule
    }, item);

    this._results.push(item);
};

['info', 'warn', 'error'].forEach(function (type) {
    Reporter.prototype[type] = function (element, code, message) {
        return this.report({
            type: type.toUpperCase(),
            code: code,
            message: message,
            elem: element
        });
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
