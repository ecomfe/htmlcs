/**
 * @file rule: title-required
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    name: 'title-required',

    desc: '<title> required.',

    lint: function (getCfg, document, reporter) {
        if (!getCfg()) {
            return;
        }

        var head = document.querySelector('head');
        if (!head) {
            return;
        }

        var title = head.querySelector('title');
        var charsetMeta = head.querySelector('meta[charset]');

        if (!title) {
            reporter.warn(head.startIndex, '024', '<title> required.');
        }
        else if (!charsetMeta || title.previousElementSibling !== charsetMeta) {
            reporter.warn(title.startIndex, '025', '<title> should be just after <meta> charset.');
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

        var title = head.querySelector('title');
        var charsetMeta = head.querySelector('meta[charset]');

        if (!title) {
            title = document.createElement('title');
        }

        if (charsetMeta && title.previousElementSibling !== charsetMeta) {
            if (charsetMeta.nextSibling) {
                head.insertBefore(title, charsetMeta.nextSibling);
            }
            else {
                head.appendChild(title);
            }
        }
    }

};
