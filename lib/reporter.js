/**
 * @file class Reporter
 * @author nighca<nighca@live.cn>
 */

function Reporter(options) {
    this._options = options;

    this._results = [];
}

Reporter.prototype.setRule = function (rule) {
    this.rule = rule;
};

Reporter.prototype.report = function (item) {
    var pos = item.pos ||
        (item.elem && item.elem.startPos) ||
        {
            line: 0,
            col: 0
        };

    this._results.push({
        type: item.type,
        code: item.code,
        rule: item.rule || this.rule,
        line: pos.line,
        col: pos.col,
        message: item.message
    });
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
        return (a.line > b.line || a.line === b.line && a.col > b.col) ? 1 : -1;
    });

    return this._results;
};

module.exports = Reporter;
