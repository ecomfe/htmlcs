/**
 * @file rule: html-lang
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'html-lang',

    desc: 'Attribute "lang" of <html> recommended to be set.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        var html = document.querySelector('html');

        if (!html) {
            return;
        }

        if (!html.getAttribute('lang')) {
            reporter.warn(html, '010', 'Attribute "lang" of <html> recommended to be set.');
        }

    },

    format: function (enable, document, options) {
        if (!enable) {
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
