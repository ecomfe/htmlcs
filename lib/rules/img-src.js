/**
 * @file rule: img-src
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'img-src',

    desc: 'Attribute "src" of <img> should not be empty.',

    lint: function (getCfg, document, reporter) {
        if (!getCfg()) {
            return;
        }

        document.querySelectorAll('img[src=""]').forEach(function (img) {
            reporter.warn(img.startIndex, '013', 'Attribute "src" of <img> should not be empty.');
        });

    }

};
