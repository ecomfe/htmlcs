/**
 * @file rule: asset-type
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'asset-type',

    desc: 'Default value of attribute "type" (<link>/<script>) does not need to be set.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('link[type="text/css"]').forEach(function (element) {
            reporter.warn(
                element.startIndex,
                '001',
                'Default value of attribute "type" ("text/css") does not need to be set.'
            );
        });

        document.querySelectorAll('script[type="text/javascript"]').forEach(function (element) {
            reporter.warn(
                element.startIndex,
                '002',
                'Default value of attribute "type" ("text/javascript") does not need to be set.'
            );
        });
    },

    format: function (enable, document, options) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('link[type="text/css"], script[type="text/javascript"]').forEach(function (element) {
            element.removeAttribute('type');
        });
    }

};
