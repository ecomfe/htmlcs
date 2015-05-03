/**
 * @file rule: rel-stylesheet
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'rel-stylesheet',

    desc: 'Attribute "rel" of <link> should be set as "stylesheet".',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('link').forEach(function (element) {
            if (!element.getAttribute('rel')) {
                reporter.warn(element.startIndex, '022', 'Attribute "rel" of <link> should be set as "stylesheet".');
            }
        });

    },

    format: function (enable, document, options) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('link').forEach(function (element) {
            if (!element.getAttribute('rel')) {
                element.setAttribute('rel', 'stylesheet');
            }
        });
    }

};
