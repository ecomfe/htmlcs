function Reporter(options) {
    this._options = options;

    this._results = [];
}

Reporter.prototype.report = function (item) {
    var pos = item.pos ||
        (item.elem && item.elem.startPos) ||
        {
            line: 0,
            col: 0
        };

    item.pos = null;
    item.line = pos.line;
    item.col = pos.col;

    this._results.push(item);
};

['info', 'warn', 'error'].forEach(function (type) {
    Reporter.prototype[type] = function (element, rule, message) {
        return this.report({
            type: type.toUpperCase(),
            rule: rule,
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
