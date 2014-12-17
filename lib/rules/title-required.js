module.exports = {

    name: 'title-required',

    desc: '<title> required.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        var head = document.querySelector('head');
        if (!head) {
            return;
        }

        var title = head.querySelector('title');
        var charsetMeta = head.querySelector('meta[charset]');

        if (!title) {
            reporter.warn(head, '024', '<title> required.');
        } else if (title.previousElementSibling !== charsetMeta) {
            reporter.warn(title, '025', '<title> should be just after <meta> charset.');
        }
    }

};
