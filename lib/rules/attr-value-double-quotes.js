/**
 * @file rule: attr-value-double-quotes
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'attr-value-double-quotes',

    desc: 'Attribute value must be closed by double quotes.',

    listen: function (enable, parser, reporter) {
        if (!enable) {
            return;
        }

        parser.on('attribdata', function () {
            var tokenizer = this._tokenizer;
            var start = tokenizer._sectionStart;
            var buffer = tokenizer._buffer;
            var quote = buffer[start - 1];

            if (quote !== '"') {
                reporter.report({
                    code: '028',
                    pos: quote === '\'' ? (start - 1) : start,
                    message: 'Attribute value must be closed by double quotes'
                });
            }
        });
    }

};
