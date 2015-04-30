/**
 * @file rule: spec-char-escape
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'spec-char-escape',

    desc: 'Special characters must be escaped..',

    target: 'parser',

    lint: function (enable, parser, reporter) {
        if (!enable) {
            return;
        }

        var specialChars = ['<', '>'];

        // exclude-tags
        var excludeTags = ['script'];

        parser.on('text', function (data) {
            var currentTag = this._stack[this._stack.length - 1];
            if (excludeTags.indexOf(currentTag) >= 0) {
                return;
            }

            var start = this._tokenizer._sectionStart;

            for (var i = 0, l = data.length; i < l; i++) {
                if (specialChars.indexOf(data[i]) >= 0) {
                    reporter.warn(
                        start + i,
                        '033',
                        'Special characters must be escaped.'
                    );
                }
            }
        });
    }

};
