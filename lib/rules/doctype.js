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

        var doctype = document.doctype;
        if (doctype) {
            if (doctype.data !== '!DOCTYPE html') {
                reporter.warn(doctype, '028', 'DOCTYPE must be html5');
            }
        }
        else {
            reporter.warn(document, '009', 'DOCTYPE needed.');
        }

    }

};
