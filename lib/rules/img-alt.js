/**
 * @file rule: img-alt
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'img-alt',

    desc: 'Attribute "alt" of <img> is recommended to be set.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        document.querySelectorAll('img:not([alt]), img[alt=""]').forEach(function (img) {
            reporter.warn(img, '012', 'Attribute "alt" of <img> is recommended to be set.');
        });
    }

};
