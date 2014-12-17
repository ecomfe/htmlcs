module.exports = {

    name: 'lowercase-id-with-hyphen',

    desc: 'Id should be lowercase words connected with hyphens.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('[id]').forEach(function (element) {
            if (element.id.toLowerCase() !== element.id) {
                reporter.warn(element, '020', 'Id should be lowercase words.');
            }
            if (element.id.indexOf('_') >= 0) {
                reporter.warn(element, '021', 'Id parts should be connected with "-" insteadof "_".');
            }
        });
    }

};
