/**
 * @file rule: multiple-stylesheets
 * @author Oleg Krivtsov <oleg@webmarketingroi.com.au>
 */

module.exports = {

    name: 'multiple-stylesheets',

    desc: 'More than one style-sheet is included (combining all style-sheets into one neat CSS file would be cleaner)',

    target: 'parser',

    lint: function (getCfg, parser, reporter) {

        var stylesheetCount = 0;

        parser.on('opentag', function (name, attrs) {
            if (!getCfg()) {
                return;
            }

            if (name === 'link' && attrs.rel === 'stylesheet') {
                if (stylesheetCount === 1) {
                    reporter.warn(
                            this.startIndex,
                            '028',
                            'More than one style-sheet is included (combining '
                            + 'all style-sheets into one neat CSS file would be cleaner)'
                        );
                }

                stylesheetCount++;
            }
        });
    }
};
