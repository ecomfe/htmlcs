function Reporter(options) {
    this._options = options;

    this._results = [];
}

Reporter.prototype.report = function (item) {
    item.pos = item.pos ||
        (item.elem && item.elem.startPos) ||
        {
            line: 0,
            col: 0
        };

    this._results.push(item);
};

Reporter.prototype.info = function (element, message) {
    this.report({
        type: 'INFO',
        message: message,
        elem: element
    });
};

Reporter.prototype.warn = function (element, message) {
    this.report({
        type: 'WARN',
        message: message,
        elem: element
    });
};

Reporter.prototype.error = function (element, message) {
    this.report({
        type: 'ERROR',
        message: message,
        elem: element
    });
};

Reporter.prototype.result = function () {
    this._results.sort(function (a, b) {
        return (a.pos.line > b.pos.line || a.pos.line === b.pos.line && a.pos.col > b.pos.col) ? 1 : -1;
    });

    return this._results;
};

module.exports = Reporter;
