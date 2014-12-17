module.exports = {

    name: 'rel-stylesheet',

    desc: 'Attribute "rel" of <link> should be set as "stylesheet".',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('link').forEach(function (element) {
            if (!element.getAttribute('rel')) {
                reporter.warn(element, '022', 'Attribute "rel" of <link> should be set as "stylesheet".');
            }
        });

    }

};
