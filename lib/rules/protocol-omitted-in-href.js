/**
 * @file rule: protocol-omitted-in-href
 * @author Oleg Krivtsov <oleg@webmarketingroi.com.au>
 */

module.exports = {

    name: 'protocol-omitted-in-href',

    desc: 'Protocol (http:// or https://) should be omitted from href attribute (there should be "//" instead)',

    target: 'parser',

    lint: function (getCfg, parser, reporter) {
        parser.on('opentag', function (name, attrs) {
            if (!getCfg()) {
                return;
            }

            if (name !== 'link' && name !== 'script') {
                return;
            }

            if (attrs.href && /^https?:\/\//i.test(attrs)) {
                var index = this.startIndex;

                reporter.warn(
                    index,
                    '028',
                    'Protocol (http:// or https://) should be omitted from href attribute (there should be "//" instead)'
                );
            }
        });
    }

};
