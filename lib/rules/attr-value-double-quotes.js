/**
 * @file rule: attr-value-double-quotes
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'attr-value-double-quotes',

    desc: 'Attribute value must be closed by double quotes.',

    target: 'parser',

    lint: function (enable, register, reporter) {
        if (!enable) {
            return;
        }

        register('attribdata', function () {
            var tokenizer = this._tokenizer;
            var start = tokenizer._sectionStart;
            var buffer = tokenizer._buffer;
            var quote = buffer[start - 1];

            if (quote !== '"') {
                reporter.warn(
                    quote === '\'' ? (start - 1) : start,
                    '028',
                    'Attribute value must be closed by double quotes.'
                );
            }
        });
    }

};
