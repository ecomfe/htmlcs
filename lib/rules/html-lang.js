/**
 * @file rule: html-lang
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'html-lang',

    desc: 'Attribute "lang" of <html> recommended to be set.',

    lint: function (getCfg, document, reporter) {
        if (!getCfg()) {
            return;
        }

        var html = document.querySelector('html');

        if (!html) {
            return;
        }

        if (!html.getAttribute('lang')) {
            reporter.warn(html.startIndex, '010', 'Attribute "lang" of <html> recommended to be set.');
        }

    },

    format: function (getCfg, document, options) {
        if (!getCfg()) {
            return;
        }

        var html = document.querySelector('html');

        if (!html) {
            return;
        }

        if (!html.getAttribute('lang')) {
            html.setAttribute('lang', 'zh-CN');
        }
    }

};
