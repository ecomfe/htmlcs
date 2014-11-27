module.exports = {

    name: 'charset',

    desc: '<meta charset> recommended.',

    lint: function (enable, document, reporter) {
        if (!enable) {
            return;
        }

        var head = document.querySelector('head');
        if (!head) {
            return;
        }

        var charsetMeta = head.querySelector('meta[charset]');
        if (!charsetMeta) {
            reporter.warn(head, '<meta charset> recommended.');
        } else if (charsetMeta !== head.firstElementChild) {
            reporter.warn(charsetMeta, '<meta> charset should be the first element child of <head>');
        }
    }

};
