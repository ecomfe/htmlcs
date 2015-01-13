/**
 * @file rule: img-width-height
 * @author nighca<nighca@live.cn>
 */

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
                reporter.warn(img, '015', 'Attribute "width" & "height" of <img> is recommended to be set.');
            }
            else if (!width) {
                reporter.warn(img, '016', 'Attribute "width" of <img> is recommended to be set.');
            }
            else if (!height) {
                reporter.warn(img, '017', 'Attribute "height" of <img> is recommended to be set.');
            }
        });

    }

};
