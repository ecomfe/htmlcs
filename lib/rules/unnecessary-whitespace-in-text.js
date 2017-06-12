/**
 * @file rule: unnecessary-whitespace-in-text
 * @author Oleg Krivtsov <oleg@webmarketingroi.com.au>
 */

module.exports = {

    name: 'unnecessary-whitespace-in-text',

    desc: 'Unnecessary usage of white-space(s) in text',

    target: 'parser',

    lint: function (getCfg, parser, reporter) {

        parser.on('text', function (data) {
            if (!getCfg()) {
                return;
            }

            var pattern = /^.+([ \t]+)$/;
            var match = data.match(pattern);
            if (match) {
                reporter.warn(
                    this.startIndex + match.length + 1,
                        '052',
                        'Unnecessary usage of a trailing white-space(s) in text'
                    );

            }

            pattern = /\w([ \t]{2,})\w/;
            match = data.match(pattern);
            if (match) {
                reporter.warn(
                    this.startIndex + match.length + 1,
                        '052',
                        'Unnecessary usage of a trailing white-space(s) in text'
                    );

            }
        });
    }
};
