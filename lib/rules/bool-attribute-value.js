var booleanAttributes = [
    'allowfullscreen', 'async', 'autofocus', 'autoplay',
    'checked', 'controls', 'default', 'defer',
    'disabled', 'formnovalidate', 'hidden', 'ismap',
    'itemscope', 'loop', 'multiple', 'muted', 'novalidate',
    'open', 'readonly', 'required', 'reversed',
    'scoped', 'seamless', 'selected', 'sortable', 'typemustmatch'
];

module.exports = {

    name: 'bool-attribute-value',

    desc: 'Value of boolean attributes should not be set.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('*').forEach(function (element) {
            booleanAttributes.forEach(function (attribute) {
                if (element.getAttribute(attribute)) {
                    reporter.warn(element, 'Value of boolean attribute "' + attribute + '" should not be set.');
                }
            });
        });
    }

};
