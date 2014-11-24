module.exports = {

    name: 'unique-id',

    desc: 'Id should be unique in page.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('[id]').forEach(function (element) {
            if (element.ownerDocument.querySelectorAll('#' + element.id).length > 1) {
                reporter.warn(element, 'Id should be unique in page.');
            }
        });
    }

};
