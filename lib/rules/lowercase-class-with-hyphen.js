/**
 * @file rule: lowercase-class-with-hyphen
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'lowercase-class-with-hyphen',

    desc: 'ClassName should be lowercase words connected with hyphens.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('[class]').forEach(function (element) {
            if (element.className.toLowerCase() !== element.className) {
                reporter.warn(element, '018', 'ClassName should be lowercase words.');
            }
            if (element.className.indexOf('_') >= 0) {
                reporter.warn(element, '019', 'ClassName parts should be connected with "-" insteadof "_".');
            }
        });
    }

};
