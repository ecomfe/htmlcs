module.exports = {

    name: 'doctype',

    desc: 'DOCTYPE needed.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        if (!document.doctype) {
            reporter.warn(document, 'DOCTYPE needed.');
        }

    }

};
