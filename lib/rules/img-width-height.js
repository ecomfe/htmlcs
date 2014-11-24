module.exports = {

    name: 'img-width-height',

    desc: 'Attribute "width" & "height" of <img> is recommended to be set.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('img').forEach(function (img) {
            var width = img.getAttribute('width');
            var height = img.getAttribute('height');

            if (!width && !height) {
                reporter.warn(img, 'Attribute "width" & "height" of <img> is recommended to be set.');
            } else if (!width) {
                reporter.warn(img, 'Attribute "width" of <img> is recommended to be set.');
            } else if (!height) {
                reporter.warn(img, 'Attribute "height" of <img> is recommended to be set.');
            }
        });

    }

};
