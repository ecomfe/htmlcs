/**
 * @file rule: doctype
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'doctype',

    desc: 'DOCTYPE needed.',

    lint: function (enable, document, reporter) {
        if (!enable || !document.querySelector('html')) {
            return;
        }

        var doctype = document.doctype;
        if (doctype) {
            if (doctype.name !== 'html') {
                reporter.warn(doctype, '028', 'DOCTYPE must be html5');
            }
        }
        else {
            reporter.warn(document, '009', 'DOCTYPE needed.');
        }

    },

    format: function (enable, document, options) {
        if (!enable || !document.querySelector('html')) {
            return;
        }

        var doctype = document.doctype;
        if (doctype) {
            if (doctype.name !== 'html') {
                doctype.name = 'html';
            }
        }
        else {
            doctype = document.implementation.createDocumentType('html', '', '');
            document.insertBefore(doctype, document.firstElementChild);
            document.doctype = doctype;
        }
    }

};
