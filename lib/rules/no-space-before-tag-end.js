/**
 * @file rule: no-space-before-tag-end
 * @author Oleg Krivtsov <oleg@webmarketingroi.com.au>
 */

module.exports = {

    name: 'no-space-before-tag-end',

    desc: 'There should be no whitespaces before tag end',

    target: 'parser',

    lint: function (getCfg, parser, reporter) {
        parser.on('opentag', function (name, attrs) {
            if (!getCfg()) {
                return;
            }

            var index = parser.tokenizer._index - 1;
            var buffer = parser.tokenizer._buffer[index];

            if (buffer === ' ' || buffer === '\t' || buffer === '\r' || buffer === '\n') {
                reporter.warn(
                    index,
                    '050',
                    'There should be no whitespaces before tag end'
                );
            }
        });
    }

};
