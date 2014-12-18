/**
 * @file rule: doctype
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'doctype',

    desc: 'DOCTYPE needed.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        if (document.doctype) {
            if (document.doctype.data !== '!DOCTYPE html') {
                reporter.warn(document, '028', 'DOCTYPE must be html5')
            }
        }
        else {
            reporter.warn(document, '009', 'DOCTYPE needed.');
        }

    }

};
