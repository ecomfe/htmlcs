/**
 * @file rule: doctype
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'doctype',

    desc: 'DOCTYPE needed.',

    lint: function (getCfg, document, reporter) {
        var html = document.querySelector('html');

        if (!html || !getCfg(html)) {
            return;
        }

        var doctype = document.doctype;
        if (doctype) {
            if (doctype.name !== 'html') {
                reporter.warn(doctype.startIndex, '028', 'DOCTYPE must be html5.');
            }
        }
        else {
            reporter.warn(document.startIndex, '009', 'DOCTYPE needed.');
        }

    },

    format: function (getCfg, document, options) {
        var html = document.querySelector('html');

        if (!html || !getCfg(html)) {
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
