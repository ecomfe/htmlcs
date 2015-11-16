/**
 * @file rule: attr-value-double-quotes
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'attr-value-double-quotes',

    desc: 'Attribute value must be closed by double quotes.',

    target: 'parser',

    lint: function (getCfg, parser, reporter) {
        parser.on('attribute', function (name, value) {
            if (!getCfg()) {
                return;
            }

            var tokenizer = this.tokenizer;
            var start = tokenizer._index - value.length - 1;
            var quote = tokenizer._buffer[start];

            if (quote !== '"') {
                reporter.warn(
                    quote === '\'' ? start : (start + 1),
                    '028',
                    'Attribute value must be closed by double quotes.'
                );
            }
        });
    }

};
