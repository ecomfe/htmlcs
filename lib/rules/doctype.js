/**
 * @file rule: doctype
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'doctype',

    desc: 'DOCTYPE needed.',

    target: 'parser',

    lint: function (getCfg, parser, reporter) {

        if (!getCfg()) {
            return;
        }

        var doctype = false;
        var html = false;

        parser.on('processinginstruction', function (name, data) {

            if (name === '!doctype') {
                
                var index = parser.tokenizer._index - 1;

                data = data.split(' ');
                doctype = (data[0]).trim();
                html = (data[1]).trim();

                if (getCfg('doctype') === 'upper' && doctype !== '!DOCTYPE') {
                    reporter.warn(index, '041', 'DOCTYPE must be uppercase.');
                }

                if (html !== 'html5') {
                    reporter.warn(index, '041', 'DOCTYPE must be html5.');
                }
            }
        });

        parser.on('end', function () {
            if (!doctype) {
                reporter.warn(0, '009', 'DOCTYPE needed.');
            }
        });
    },

    format: function (getCfg, document, options) {
        var doctype = document.doctype;
        var html = document.querySelector('html');

        if (!html || !getCfg(html) || doctype && doctype.name === 'html') {
            return;
        }

        if (doctype) {
            doctype.name = 'html';
        }
        else {
            doctype = document.implementation.createDocumentType('html', '', '');
            document.insertBefore(doctype, document.firstElementChild);
            document.doctype = doctype;
        }
    }

};
