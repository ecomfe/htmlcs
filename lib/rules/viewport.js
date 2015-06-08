/**
 * @file rule: viewport
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'viewport',

    desc: '<meta name="viewport" content="..."> recommended.',

    lint: function (getCfg, document, reporter) {
        if (!getCfg()) {
            return;
        }

        var head = document.querySelector('head');
        if (!head) {
            return;
        }

        var viewportMeta = head.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            reporter.warn(head.startIndex, '027', '<meta name="viewport" content="..."> recommended.');
        }
    },

    format: function (getCfg, document, options) {
        if (!getCfg()) {
            return;
        }

        var head = document.querySelector('head');
        if (!head) {
            return;
        }

        var viewportMeta = head.querySelector('meta[name="viewport"]');

        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.setAttribute('name', 'viewport');
            viewportMeta.setAttribute('content', 'width=device-width,minimum-scale=1.0,maximum-scale=1.0');
            head.appendChild(viewportMeta);
        }
    }

};
