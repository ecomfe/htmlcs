/**
 * @file rule: style-disabled
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'style-disabled',

    desc: 'Style tag can not be used.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.getElementsByTagName('style').forEach(function (element) {
            reporter.warn(
                element.startIndex,
                '034',
                'Style tag can not be used.'
            );
        });
    }

};
