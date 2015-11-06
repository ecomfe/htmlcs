/**
 * @file rule: self-close
 * @author nighca<nighca@live.cn>
 */

// http://www.w3.org/TR/html5/syntax.html#elements-0
var voidTags = [
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
];

module.exports = {

    name: 'self-close',

    desc: 'Should void tags close themeselves with "/".',

    target: 'parser',

    lint: function (getCfg, parser, reporter) {
        var current;

        parser.on('opentagname', function (name) {
            current = {
                pos: this._tokenizer._sectionStart - 1,
                tag: name.toLowerCase()
            };
        });

        parser.on('opentagend', function () {
            if (!current || voidTags.indexOf(current.tag) < 0) {
                return;
            }

            var cfg = getCfg();
            var tokenizer = this._tokenizer;
            var selfClosed = tokenizer._buffer[tokenizer._index - 1] === '/';

            if (selfClosed && cfg === 'no-close') {
                reporter.warn(
                    current.pos,
                    '039',
                    'Void tags should not close themeselves with "/".'
                );
            }

            if (!selfClosed && cfg === 'close') {
                reporter.warn(
                    current.pos,
                    '040',
                    'Void tags should close themeselves with "/".'
                );
            }
        });
    },

    format: function (getCfg, document, options) {
        options['self-close'] = getCfg() === 'close' ? 'close' : 'no-close';
    }
};
